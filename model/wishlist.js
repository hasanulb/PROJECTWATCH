const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports = {
  addToWishList:(productId,userId)=>{

    let proObj = {
      item:ObjectId(productId),
      quantity:1
    }

    return new Promise(async(resolve,reject)=>{
      let userWishlist = await db.get().collection(collection.WISHLIST).findOne({user:ObjectId(userId)})
      if(userWishlist)
      {
        let proExist = userWishlist.products.findIndex(product=>product.item == productId)
        console.log(proExist)
        if(proExist!=-1)
        {
           db.get().collection(collection.WISHLIST).updateOne({user:ObjectId(userId),'products.item':ObjectId(productId)},
           {
            $inc:{'products.$.quantity':1} 
           }).then(()=>{
            resolve()
           })
        }
        else
        {
          db.get().collection(collection.WISHLIST).updateOne({user:ObjectId(userId)},
          {
            $push:{products:proObj}
          }).then((response)=>{
            resolve()
          })
        }

      }
      else
      {
        let wishlistObj = {
          user:ObjectId(userId),
          products:[proObj]
        }
        db.get().collection(collection.WISHLIST).insertOne(wishlistObj).then((response)=>{
          resolve()
        })
      }
    })
  },
  getWishListProducts:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let wishlistItems = await db.get().collection(collection.WISHLIST).aggregate([
        {
          $match:{user:ObjectId(userId)}
        },
        {
          $unwind:'$products'
        },
        {
          $project:{
            item:'$products.item',
            quantity:'$products.quantity'
          }
        },
        {
          $lookup:{
            from:collection.PRODUCT,
            localField:'item',
            foreignField:'_id',
            as:'product'

          }
        },
        {
         $project:{
          item:1,
          quantity:1,
          productDetails:{$arrayElemAt:['$product',0]}
        
         } 
        }

      ]).toArray()
      console.log('cart items ===========>>>>>>>>>>>>>>>>',wishlistItems)
      resolve(wishlistItems)
  })
  },
  getWishListCount:(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let count = 0 
      let wishList = await db.get().collection(collection.WISHLIST).findOne({user:ObjectId(userId)})
      if(wishList)
      {
        count = wishList.products.length
      }
      resolve(count)
    })
  },
  removeWishListProduct:(wishlist,product)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.WISHLIST).updateOne(
        {_id:ObjectId(wishlist)},
        {
          $pull:{products:{item:ObjectId(product)}}
        }
        
      ).then(()=>{
        resolve({productRemoved:true})
      })
    })
  }
}

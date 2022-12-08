const bcrypt = require('bcrypt');
const { response } = require('express');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');
const db = require('../config/connection');
const collection = require('../config/collection')

module.exports = {
    addcategory: (categoryData) => {
        return new Promise(async (resolve, reject) => {
            const checkcategory = await db.get().collection(collection.CATEGORY).findOne({ category: categoryData.category })
            if (checkcategory == categoryData) {
                console.log("category exists")
            }else{
            db.get().collection(collection.CATEGORY).insertOne(categoryData).then((data) => {
                resolve(data)
            })
        }
        })
    },
    showcategory: () => {
        return new Promise(async (resolve, reject) => {
            let category = await db.get().collection(collection.CATEGORY).find().toArray()
            resolve(category)
        })
    },
    deletecategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.CATEGORY).updateOne({_id:ObjectId(categoryId)},{
            $set:{
              state:'deleted'
            }
          }).then((response)=>{
            resolve(response)
          })
        })
      },
      retrivecategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.CATEGORY).updateOne({_id:ObjectId(categoryId)},{
            $set:{
              state:'available'
            }
          }).then((response)=>{
            resolve(response)
          })
        })
      },
    viewProductDetails:(categoryId)=>{
        console.log("decdsc",categoryId);
        return new Promise(async(resolve,reject)=>{
            let category = await db.get().collection(collection.CATEGORY).findOne({_id:ObjectId(categoryId)})
            let CATEGORYNAME = await category.category
            console.log("ewedwdddd",CATEGORYNAME );
            let product = await db.get().collection(collection.CATEGORY).aggregate([
                {
                    $match: { _id: ObjectId(categoryId) }
                  },
                  {
                    $lookup: {
                      from: collection.PRODUCT,
                      localField: 'category',
                      foreignField: 'productdata.productcategory',
                      as: 'product'
          
                    }
                  },
                  {
                    $unwind: '$product'
                  }

            ]).toArray()
            console.log("ewqrwew",product);
            resolve(product)
        })
    }
}

const bcrypt = require('bcrypt');
const { response } = require('express');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');
const db = require('../config/connection');
const collection = require('../config/collection')

module.exports = {
  addproduct: (productdata, image) => {
    const products = {
      productname: productdata.productname,
      productcategory: productdata.productcategory,
      productbrand: productdata.productbrand,
      productquantity: productdata.productquantity,
      actualprice: productdata.actualprice,
      sellingprice: productdata.sellingprice,
      description: productdata.description,
      image: image,
    }
    return new Promise(async (resolve, reject) => {
      console.log("ADDED PRODUCT", products);
      db.get().collection(collection.PRODUCT).insertOne(products).then((data) => {
        resolve(data)
      })
    })
  },
  showproduct: () => {
    return new Promise(async (resolve, reject) => {
      let product = await db.get().collection(collection.PRODUCT).find({}).toArray()
      resolve(product)
    })
  },

  deleteproduct: (productId) => {
    console.log("qqqqq", productId);
    return new Promise((resolve, reject) => {
      db.get().collection(collection.PRODUCT).updateOne({ _id: ObjectId(productId) }, {
        $set: {
          state: 'deleted'
        }
      }).then((response) => {
        resolve(response)
      })
    })
  },
  retriveproduct: (productId) => {
    console.log("qqqqq", productId);
    return new Promise((resolve, reject) => {
      db.get().collection(collection.PRODUCT).updateOne({ _id: ObjectId(productId) }, {
        $set: {
          state: 'available'
        }
      }).then((response) => {
        resolve(response)
      })
    })
  },
  editproduct: (productId) => {
    return new Promise(async (resolve, reject) => {
      db.get().collection(collection.PRODUCT).findOne({ _id: ObjectId(productId) }).then((response) => {
        resolve(response)
      })
    })
  },
  updateproduct: (productdata, image, productId) => {
    const products = { productdata, image }
    return new Promise(async (resolve, reject) => {
      console.log("UPDATED PRODUCT", products);
      console.log(productId, "djnndj");
      db.get().collection(collection.PRODUCT).updateOne({ _id: ObjectId(productId) }, {
        $set: {
          productname: productdata.productname,
          productcategory: productdata.productcategory,
          productbrand: productdata.productbrand,
          productquantity: productdata.productquantity,
          actualprice: parseInt(productdata.actualprice),
          sellingprice: parseInt(productdata.sellingprice),
          description: productdata.description,
          image: image,
        },
      }).then((data) => {
        resolve(data)
      })
    })
  }
}
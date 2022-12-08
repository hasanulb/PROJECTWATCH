const bcrypt = require('bcrypt');
const { response } = require('express');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');
const db = require('../config/connection');
const collection = require('../config/collection')

module.exports = {
    addbrand: (brandData) => {
        return new Promise(async (resolve, reject) => {
            const checkbrand = await db.get().collection(collection.BRAND).findOne({ brand: brandData.brand })
            if (checkbrand) {
                console.log("brand exists")
            }else{
            db.get().collection(collection.BRAND).insertOne(brandData).then((data) => {
                resolve(data)
            })
        }
        })
    },
    showbrand: () => {
        return new Promise(async (resolve, reject) => {
            const brand = await db.get().collection(collection.BRAND).find().toArray()
            resolve(brand)
        })
    },
    deletebrand:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.BRAND).updateOne({_id:ObjectId(brandId)},{
            $set:{
                state:'deleted'
              },
          }
          ).then((response)=>{
            resolve(response)
          })
        })
      },
      retrivebrand:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
          db.get().collection(collection.BRAND).updateOne({_id:ObjectId(brandId)},{
            $set:{
                state:'available'
              },
          }
          ).then((response)=>{
            resolve(response)
          })
        })
      },
    editbrand:(brandId)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.BRAND).updateOne({_id:ObjectId(brandId)},{
                $set: {
                    brand:brandId.brand
                },
            }).then((response)=>{
                resolve(response)
            })
        })
    }
}
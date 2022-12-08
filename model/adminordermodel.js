const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectID } = require('bson')
const { resolveContent } = require('nodemailer/lib/shared')
module.exports = {
  showOrder: (orderId) => {
    return new Promise((resolve, reject) => {
      let orderList = db.get().collection(collection.ORDER).find().toArray()
      resolve(orderList)
    })
  },
  updateOrderStatus: (orderId, newStatus) => {
    return new Promise(async (resolve, reject) => {
      let status = await db.get().collection(collection.ORDER).updateOne({ _id: ObjectID(orderId) }, {
        $set: {
          status: newStatus
        }
      })
      resolve(status)
    })
  },
  showidorder: (orderId) => {
    return new Promise((resolve, reject) => {
      let orderList = db.get().collection(collection.ORDER).find({ _id: ObjectID(orderId) }).toArray()
      resolve(orderList)
    })
  },
  chartDetailsCount:()=>{
    return new Promise(async(resolve,reject)=>{
      let deliveredOrder = await db.get().collection(collection.ORDER).find({status:'delivered'}).toArray()
      let deliveredOrderLength = deliveredOrder.length
      let orderplaced = await db.get().collection(collection.ORDER).find({status:'Placed'}).toArray()
      let orderPlacedLength  = orderplaced.length
      let shippedOrder = await db.get().collection(collection.ORDER).find({status:'shipped'}).toArray()
      let shippedOrderLength = shippedOrder.length 
      let totalOrders = await db.get().collection(collection.ORDER).find().toArray()
      let totalOrdersLength = totalOrders.length
      resolve({deliveredOrderLength,shippedOrderLength,orderPlacedLength,totalOrdersLength})
    })
  }
}
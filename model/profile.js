const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectID } = require('bson')
const bcrypt = require('bcrypt')

module.exports = {

  getUserOrders: (userId) => {
    console.log("sdas", userId);
    return new Promise(async (resolve, reject) => {
      let orders = await db.get().collection(collection.ORDER).find({ userId: ObjectID(userId) }).sort({date:-1}).toArray()
      resolve(orders)
    })
  },

  editUserProfile: (userDetails, userData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER)
        .updateOne(
          { _id: ObjectID(userData._id) },
          {
            $set: {
              username: userDetails.username,
              mobile: userDetails.phone,
              streetaddress: userDetails.street,
              appartment: userDetails.appartment,
              city: userDetails.city,
              pinCode: userDetails.zip,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },

  getOrderProductDetails: (orderId) => {
    return new Promise(async (resolve, reject) => {
      let orders = await db.get().collection(collection.ORDER).aggregate([
        {
          $match: { _id: ObjectID(orderId) }
        },
        {
          $unwind: '$products'
        },
        {
          $lookup: {
            from: collection.PRODUCT,
            localField: 'products.item',
            foreignField: '_id',
            as: 'orderProducts'
          }
        },
        {
          $project: {
            _id: 0,
            orderProducts: 1
          }
        }
      ]).toArray()
      console.log('this is orders', orders);
      resolve(orders)
    })
  },

  findUser: (userID) => {
    return new Promise(async (resolve, reject) => {
      let user = await db.get().collection(collection.USER).findOne({ _id: ObjectID(userID) })
      resolve(user)
    })
  },

  updatePassword: (newPassword, user) => {
    return new Promise(async (resolve, reject) => {
      newPassword = await bcrypt.hash(newPassword, 10)

      db.get().collection(collection.USER).updateOne({ _id: ObjectID(user._id) },
        {
          $set: {
            Password: newPassword
          }
        }
      )
      resolve()
    })
  }

}





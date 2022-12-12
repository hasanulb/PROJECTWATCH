const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectID } = require("bson");
const { response } = require("express");
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_wpBmeoeqXZ8EQl",
  key_secret: "ty8zGVWEmGrr6TqF8uYyniLY",
});

module.exports = {
  placeOrder: (order, products, total) => {
    return new Promise((resolve, reject) => {
      console.log("hellomrpererraa", order, products, total);
      let status =
        order.payment_method === "cash_on_delivery" ? "placed" : "pending";
      let orderObj = {
        deliveryDetails: {
          firstName: order.firstname,
          lastName: order.lastname,
          state: order.state,
          mobile: order.phone,
          streetaddress: order.street,
          appartment: order.appartment,
          city: order.city,
          pinCode: order.zip,
          totalAmout: total,
        },
        userId: ObjectID(order.userid),
        paymentMethod: order.payment_method,
        products: products,
        status: status,
        date: new Date(),
      };

      
      console.log("order object = > ", orderObj);
      db.get().collection(collection.ORDER).insertOne(orderObj).then((response) => {
      db.get().collection(collection.CART).deleteOne({ user: ObjectID(order.userId) })
      console.log('/*-/*-**/*-/*/*-*/-*/*', response)
          resolve(response.insertedId);
        });
    });

  },
  getCartProductsList: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cart = await db
        .get()
        .collection(collection.CART)
        .findOne({ user: ObjectID(userId) });
      console.log(cart);
      resolve(cart.products);
    });
  },
  generateRazorpay: (orderId, total) => {
    return new Promise((resolve, reject) => {
      console.log(total);
      total = parseInt(total)
      var options = {
        amount: total * 100,
        currency: "INR",
        receipt: "" + orderId
      }

      instance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err)
        }
        else {
          console.log("New Order = ", order)
          resolve(order)
        }

      })
    });
  },
  verifyPayment: (details) => {
    console.log("ddsdsd",details);
    return new Promise((resolve, reject) => {
      let {
        createHmac,
      } = require('node:crypto');
      let hmac = createHmac('sha256', 'ty8zGVWEmGrr6TqF8uYyniLY');

      hmac.update(details.payment.razorpay_order_id + '|' + details.payment.razorpay_payment_id);
      hmac = hmac.digest('hex')
      if (hmac == details.payment.razorpay_signature) {
        resolve()
      } else {
        reject()
      }
    })
  },

  changePaymentStatus: (orderID) => {
    return new Promise((resolve, reject) => {
      db.get().collection(collection.ORDER).updateOne(
        { _id: ObjectID(orderID) },
        {
          $set: {
            status: "Placed"
          }
        }
      ).then(() => {
        resolve()
      })
    })
  }
}

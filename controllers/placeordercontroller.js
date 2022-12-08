const placeOrderModel = require('../model/placeorder')
const checkOut = require('../model/checkout')
const cartModel = require('../model/cartmodel')
const wishListModel = require('../model/wishlist')
const category = require('../model/admin-category')
const e = require('express')

exports.placeOrder = async (req, res) => {
  let products = await placeOrderModel.getCartProductsList(req.body.userid)
  let totalPrice = parseInt(req.query.finalprice);
  placeOrderModel.placeOrder(req.body, products, totalPrice).then((orderId) => {
    if (req.body.payment_method === 'cash_on_delivery') {
      res.json({ codSuccess: true })
    }
    else {
      placeOrderModel.generateRazorpay(orderId, totalPrice).then((response) => {
        res.json(response)
      })
    }
  })
}

exports.verifyPayment = (req,res)=>{
  console.log(req.body);
  placeOrderModel.verifyPayment(req.body).then(()=>{
      placeOrderModel.changePaymentStatus(req.body.order.receipt).then(()=>{
          console.log("Payment SuccessFull");
          res.json({status:true})
      })
  }).catch((err)=>{
      console.log(err);
      res.json({status:false,errMsg: ""})
  })
}

exports.showOrderPlaced = async(req,res)=>{
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
 
  category.showcategory().then((category) => {
    let userData = req.session.user;
    res.render("user/orderplacedpage", {
      admin:false,
      user:true,
      userData,
      cartcount,
      category,
      wishListCount
    }); 
  });
}









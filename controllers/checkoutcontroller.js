const cartmodel = require("../model/cartmodel");
const wishListModel = require("../model/wishlist");
const checkOut = require("../model/checkout");
const category = require("../model/admin-category");
const couponModel = require("../model/usercouponmodel")


exports.checkout = async (req, res) => {
  let price = req.query.finalTotal;
  let products = await cartmodel.getCartProducts(req.session.user._id)
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartmodel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  let total = price;
  category.showcategory().then((category) => {
    let userData = req.session.user;
    res.render("user/checkout", {
      admin: false,
      user: true,
      userData,
      cartcount,
      category,
      products,
      total,
      wishListCount,
      price
    });
  });
}

exports.checkoutprice = (req,res) =>{
  let finalTotal = parseInt(req.query.finalprice)
  let details = req.query
  details.finalprice = parseInt(details.finalprice)
  if(details.couponcode==='')
  {
    let shippingCharge =  (5/100)*details.finalprice
    finalTotal = details.finalprice + shippingCharge
    res.json(finalTotal)
  }
  else{
    let couponDetails = couponModel.getCouponDetails(details.couponCode)
    if(couponDetails)
    {
       couponModel.getDiscount(couponDetails, details.finalprice).then((response) => {
        finalTotal = response.discountedTotal
        finalTotal = Math.round(finalTotal)
        res.json(details.finalprice)

      });
    }
    else
    {
      let shippingCharge =  (5/100)*details.finalprice
      finalTotal = details.finalprice + shippingCharge
      res.json(details.finalprice) 
    }
  }
 
}
const couponModel = require("../model/userCouponModel");
const cartCheckOutModel = require("../model/checkout");

exports.applyCoupon = async (req,res) => {
  console.log("coupon bohhhdy =>", req.query);

  let userData = req.session.user;
  let couponCode = req.query.code;
  let totalAmount = await cartCheckOutModel.getTotalAmount(userData._id);//total of cart
  console.log("userData ====>", userData);
  console.log("couponCode ===>", couponCode);
  console.log("total amount ===>>", totalAmount);
  let couponDetails = await couponModel.getCouponDetails(couponCode);
  await couponModel.getDiscount(couponDetails, totalAmount).then((response) => {
    console.log('**********************************bvccv',response);
    res.json(response);
  });
};

const couponModel = require('../Model/admin-couponmodel')

exports.showCouponPage = (req,res)=>{
  couponModel.displayCoupon().then((availableCoupons)=>{
    res.render('admin/adminCouponPage',{admin:true,title:'COUPON CONTROL PAGE',availableCoupons})
  })
  
}
exports.addCoupon = (req,res)=>{
  couponModel.addCoupon(req.body).then(()=>{
    couponModel.displayCoupon().then((availableCoupons)=>{

      res.render('admin/adminCouponPage',{admin:true,title:'COUPON CONTROL PAGE',availableCoupons})
    })
  })
}

exports.deleteCoupon = (req,res)=>{
  let couponId = req.query.id
couponModel.deleteCoupon(couponId).then(()=>{
res.json()
})
}

const { response } = require("express");
const cartModel = require("../model/cartmodel");
const category = require("../model/admin-category")
const wishListModel = require("../model/wishlist");
const checkOut = require("../model/checkout");



exports.showCartPage = async (req,res)=>{
    let products = await cartModel.getCartProducts(req.session.user._id)
    let cartcount = null 
    let User= req.session.user
    let wishListCount = null
    let total = 0
    if(products.length>0){
      total = await checkOut.getTotalAmount(req.session.user._id)
    }      
    if(req.session.user){
      cartcount = await cartModel.getCartCount(req.session.user._id)
      wishListCount = await wishListModel.getWishListCount(req.session.user._id)
    }
    
    category.showcategory().then((category)=>{
         
      let userData = req.session.user
      let userDetails = req.session.user._id
      console.log("2222",products);
      res.render('user/cart',{admin:false,user:true,category,userData,products,userDetails,cartcount,total,User})
    })
    
  }


exports.addToCart = (req,res)=>{
    let productid = req.query.id
    cartModel.addToCart(productid,req.session.user._id).then(()=>{
      res.json({status:true})
    })
  }


  exports.changeProductQuantity = (req,res,next)=>{
    cartModel.changeProductQuantity(req.body).then(async(response)=>{
      let total = await checkOut.getTotalAmount(req.body.user)
      response.total = total
       res.json(response)
    })
  }

  exports.removecartproducts = (req,res)=>{
    console.log('remove cart ==========>>>>>>>>>>>>>> ',req.query);
   cartModel.removecartProduct(req.query.cartid,req.query.productid).then((response)=>{
    res.json(response)
   })
  }
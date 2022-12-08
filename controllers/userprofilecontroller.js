const userProfileModel = require('../model/profile')
const cartModel = require('../model/cartmodel')
const wishListModel = require('../model/wishlist')
const category = require('../model/admin-category')
const { resolveContent } = require('nodemailer/lib/shared')



exports.viewOrders = async(req,res)=>{
let orders = await userProfileModel.getUserOrders(req.session.user._id)
console.log("scdscd",req.session.user._id);
console.log('this is my orders',orders);
let cartcount = null;
let user= req.session.user
let wishListCount = null
if (req.session.user) {
  cartcount = await cartModel.getCartCount(req.session.user._id);
  wishListCount = await wishListModel.getWishListCount(req.session.user._id)
}
category.showcategory().then((category) => {
  let userData = req.session.user;
  res.render("user/vieworderspage", {
    admin:false,
    user:true,
    userData,
    cartcount,
    category,
    wishListCount,
    orders,
    user
  });
});
}

exports.showUserProfile = async(req,res)=>{
  let orders = await userProfileModel.getUserOrders(req.session.user._id)
  let cartcount = null;
  let user= req.session.user
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.showcategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
    console.log('this is display user',userDetails)
      res.render("user/profile", {
        admin:false,
        user:true,
        userData,
        cartcount,
        category,
        wishListCount,
        orders,
        userDetails,
        user
      });
    });
  };

exports.editProfile =async(req,res)=>{
  let orders = await userProfileModel.getUserOrders(req.session.user._id)
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.showcategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
        res.render("user/editprofile", {
          admin:false,
          user:true,
          userData,
          cartcount,
          category,
          wishListCount,
          orders,
          userDetails
        });
      });
    };


exports.editProfileDetails = async(req,res)=>{
  let orders = await userProfileModel.getUserOrders(req.session.user._id)
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }

userProfileModel.editUserProfile(req.body,req.session.user).then(()=>{
  let userData = req.session.user;
    category.showcategory().then(async(category) => {
      let userDetails = await userProfileModel.findUser(userData._id)
  
      res.render("user/profile", {
        admin:false,
        user:true,
        userData,
        cartcount,
        category,
        wishListCount,
        orders,
        userDetails
      });
    });
  })

}


exports.showPasswordChangePage =async(req,res)=>{
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.showcategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
        res.render("user/changepassword", {
          admin:false,
          user:true,
          userData,
          cartcount,
          category,
          wishListCount,
          userDetails
        });
      });  
}

exports.updatePassword = async(req,res)=>{
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  
  category.showcategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
    userProfileModel.updatePassword(req.body.password,userData).then(()=>{
      res.render("user/profile", {
        admin:false,
        user:true,
        userData,
        cartcount,
        category,
        wishListCount,
        userDetails
      });
    }); 
    })
     
}

exports.viewOrderProducts = async(req,res)=>{
  let cartcount = null;
  let wishListCount = null
  if (req.session.user) {
    cartcount = await cartModel.getCartCount(req.session.user._id);
    wishListCount = await wishListModel.getWishListCount(req.session.user._id)
  }
  category.showcategory().then(async(category) => {
    let userData = req.session.user;
    let userDetails = await userProfileModel.findUser(userData._id)
    let orderId = req.query.id
    console.log('this is user order id ',orderId);
    let products = await userProfileModel.getOrderProductDetails(orderId)
    console.log('this is products of order ====>>>>>>>',products);

    res.render("user/uservieworderproducts", {
      admin:false,
      user:true,
      userData,
      cartcount,
      category,
      wishListCount,
      userDetails,
      products
    });
    // let oneProduct = await userProfileModel.getOneProduct(orderId)
    // console.log('this is one products ',oneProduct);


    })
}
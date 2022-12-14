const category = require("../model/admin-category");
const cartmodel = require("../model/cartmodel");
const wishlist = require("../model/wishlist");

exports.addToWishList = (req, res) => {
    let productid = req.query.id
    console.log("productidwishlist",productid);
    wishlist.addToWishList(productid, req.session.user._id).then(() => {
        res.json({ status: true })
    })
}

exports.showWishListPage = async(req,res)=>{
    let products = await wishlist.getWishListProducts(req.session.user._id)
    let cartcount=null
    let user= req.session.user
    let wishListCount = null
    if(req.session.user)
    {
      wishListCount = await wishlist.getWishListCount(req.session.user._id)
      cartcount = await cartmodel.getCartCount(req.session.user._id)
    }
    category.showcategory().then((category)=>{
      res.render('user/wishlist',{admin:false,user:true,category,user,cartcount,wishListCount,products})
    })
    
  }

  exports.removeWishListProduct = (req,res)=>{
    console.log('remove wishlist ==========>>>>>>>>>>>>>> ',req.query);
   wishlist.removeWishListProduct(req.query.wishlistid,req.query.productid).then((response)=>{
    res.json(response)
   })
  }


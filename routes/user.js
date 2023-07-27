const express = require("express");
let router = express.Router();
const userHelpers = require("../model/user-helper");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartcontroller");
const wishlistcontroller = require("../controllers/wishlistcontroller");
const checkoutcontroller = require("../controllers/checkoutcontroller");
const placeordercontroller = require("../controllers/placeordercontroller");
const profilecontroller = require("../controllers/userprofilecontroller");
const couponController = require('../controllers/usercouponcontroller');
const categorycontroller = require("../controllers/adminCategoryController");
const userSessionCheck = require("../middleware/sessionmiddleware");

router.get("/",userController.home);
router.get("/home",userController.home);
router.get("/login",userController.landingpage)
router.get("/shop",userSessionCheck.userSessionChecker,userController.shop);
router.get('/profile',userSessionCheck.userSessionChecker,profilecontroller.showUserProfile)
router.get('/addressAddPage',userSessionCheck.userSessionChecker,profilecontroller.addressPage)
router.post('/addAddress',userSessionCheck.userSessionChecker,profilecontroller.addAddress)
router.get('/editProfile',userSessionCheck.userSessionChecker,profilecontroller.editProfile)
router.post('/editeduserprofile',userSessionCheck.userSessionChecker,profilecontroller.editProfileDetails)
router.get("/cart",userSessionCheck.userSessionChecker,cartController.showCartPage);
router.get('/cart/applyCoupon',userSessionCheck.userSessionChecker,couponController.applyCoupon)
router.get("/addtocart",userSessionCheck.userSessionChecker,cartController.addToCart);
router.get("/singleproduct",userSessionCheck.userSessionChecker,userController.productinfo);
router.post("/changeProductQuantity",userSessionCheck.userSessionChecker,cartController.changeProductQuantity);
router.get("/signup", userController.signup);
router.get("/addtowishlist",userSessionCheck.userSessionChecker,wishlistcontroller.addToWishList);
router.get("/wishlist",userSessionCheck.userSessionChecker,wishlistcontroller.showWishListPage);
router.get("/removecart",userSessionCheck.userSessionChecker,cartController.removecartproducts)
router.get("/removewishlist",userSessionCheck.userSessionChecker,wishlistcontroller.removeWishListProduct)
router.post("/otpverification",userController.otpverification);
router.post("/checkoutprice",userSessionCheck.userSessionChecker,checkoutcontroller.checkoutprice)
router.get("/checkout",userSessionCheck.userSessionChecker,checkoutcontroller.checkout) 
router.post("/placeorder",userSessionCheck.userSessionChecker,placeordercontroller.placeOrder)
router.post("/verifyPayment",userSessionCheck.userSessionChecker,placeordercontroller.verifyPayment)
router.get("/orderplacedpage",userSessionCheck.userSessionChecker,placeordercontroller.showOrderPlaced)
router.get('/viewOrderProducts',userSessionCheck.userSessionChecker,profilecontroller.viewOrderProducts)
router.get("/viewcategory",userSessionCheck.userSessionChecker,categorycontroller.viewShop);
router.get('/vieworders',userSessionCheck.userSessionChecker,profilecontroller.viewOrders)
router.get('/changePassword',userSessionCheck.userSessionChecker,profilecontroller.showPasswordChangePage)
router.post('/updatePassword',userSessionCheck.userSessionChecker,profilecontroller.updatePassword)
router.post("/login", userController.login);
router.post("/signupaccount", userController.signupaccount)
router.get('/logout', userController.logout)











module.exports = router;
const { response } = require("express");
const multer = require('multer');
let express = require("express");
let router = express.Router();
const adminController = require("../controllers/adminController");
const Category = require("../controllers/adminCategoryController");
const Brand = require("../controllers/brandcontroller");
const product = require("../controllers/productcontroller");
const adminCoupon = require("../controllers/admin-couponcontroller");
const adminorders = require("../controllers/adminordercontroller");
const adminUser = require("../controllers/adminusercontroller");
const adminchart = require("../controllers/chartcontroller");
const adminSessionCheck = require('../middleware/sessionmiddleware');

const {storage} = require("../cloudinary/cloudinary")
const upload = multer({storage})


router.get("/",adminSessionCheck.adminSessionChecker,adminController.adminHome);
router.post("/login", adminController.adminLogin);
router.get("/adduser", adminController.addUser);
router.get("/product",adminSessionCheck.adminSessionChecker,product.adminproduct);
router.get("/productpage",adminSessionCheck.adminSessionChecker,product.viewaddproduct);
router.post("/addproduct",adminSessionCheck.adminSessionChecker,upload.single('productimage'),product.addproduct);
router.get("/editproduct",adminSessionCheck.adminSessionChecker,product.editproduct);
router.post("/editproduct",adminSessionCheck.adminSessionChecker,upload.single('productimage'),product.updateproduct);
router.get("/deleteproduct",adminSessionCheck.adminSessionChecker,product.deleteproduct);
router.get("/retriveproduct",adminSessionCheck.adminSessionChecker,product.retriveproduct)
router.get("/admincategory",adminSessionCheck.adminSessionChecker,Category.admincategory);
router.post("/addcategory",adminSessionCheck.adminSessionChecker,Category.addcategory);
router.get("/brand",adminSessionCheck.adminSessionChecker,Brand.brand)
router.post("/addbrand",adminSessionCheck.adminSessionChecker,Brand.addbrand);
router.get("/editbrand",adminSessionCheck.adminSessionChecker,Brand.editbrand);
router.post("/editbrand",adminSessionCheck.adminSessionChecker,Brand.editbrand)
router.get("/deletecategory",adminSessionCheck.adminSessionChecker,Category.deleteCategory);
router.get("/retrivecategory",adminSessionCheck.adminSessionChecker,Category.retriveCategory)
router.get("/deletebrand",adminSessionCheck.adminSessionChecker,Brand.deletebrand);
router.get("/retrivebrand",adminSessionCheck.adminSessionChecker,Brand.retrivebrand);
router.get('/admincouponpage',adminSessionCheck.adminSessionChecker,adminCoupon.showCouponPage);
router.post('/addnewcoupon',adminSessionCheck.adminSessionChecker,adminCoupon.addCoupon);
router.delete('/deletecoupon',adminSessionCheck.adminSessionChecker,adminCoupon.deleteCoupon);
router.get('/adminorderlist',adminSessionCheck.adminSessionChecker,adminorders.showOrderPage);
router.get('/adminvieworderproducts',adminSessionCheck.adminSessionChecker,adminorders.viewOrderProducts)
router.get('/adminOrderPage',adminSessionCheck.adminSessionChecker,adminorders.showOrderPage)
router.post('/updateOrderStatus',adminSessionCheck.adminSessionChecker,adminorders.updateOrderStatus)
router.get('/chartContent',adminSessionCheck.adminSessionChecker,adminchart.chartStatusCount)
router.get('/adminUserPage',adminSessionCheck.adminSessionChecker,adminUser.adminUserPage);
router.post('/adminUserPage/block',adminSessionCheck.adminSessionChecker,adminUser.userBlock)
router.post('/adminUserPage/unblock',adminSessionCheck.adminSessionChecker,adminUser.userUnblock)



router.post("/create", (req, res) => {
  adminHelper.doCreate(req.body).then((response) => {
    res.render("admin/adduser", { response, admin: true, user: false });
  });
});

router.get("/delete-data", (req, res) => {
  console.log(req.query.id);
  adminHelper.deleteUser(req.query.id).then((response) => {
    adminHelper.showUser(req.body).then((userDetails) => {
      res.render("admin/adminpage", { userDetails, admin: false, user: false });
    });
  });
});

router.get("/edit", async (req, res) => {
  if (req.session.loggedIn) {
    await adminHelper.showOneUser(req.query.id).then((response) => {
      console.log("isjdbck", response);
      res.render("admin/adminedituser", { response, admin: true, user: false });
    });
  } else {
    res.redirect('/admin')
  }
});


router.get('/logout', adminController.adminLogout);

module.exports = router;

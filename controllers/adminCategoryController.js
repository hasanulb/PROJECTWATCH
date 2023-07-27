const { response } = require('express')
const admincategory =require('../model/admin-category')
const userCartMgmt = require('../model/cartmodel')

exports.admincategory = async (req, res) => {
        admincategory.showcategory().then((category) => {
            res.render("admin/admincategory", { admin: false, user: false ,category});
        });
}

exports.addcategory = async (req, res) => {
    admincategory.addcategory(req.body).then((category) => {
        res.redirect("/admin/admincategory");
    });
}

exports.deleteCategory=(req,res)=>{
        let CategoryId = req.query.id
    admincategory.deletecategory(CategoryId).then((response)=>{
    })
}

exports.retriveCategory=(req,res)=>{
    let CategoryId = req.query.id
admincategory.retrivecategory(CategoryId).then((response)=>{
})
}



exports.viewShop = async(req,res)=>{
    let user = req.session.user 
    let cartcount = null
    if(req.session.user){
    cartcount = await userCartMgmt.getCartCount(req.session.user._id)
    }
    admincategory.showcategory().then(async(category) => {
    let userData = req.session.user
    let categoryId = req.query.id
    let product = await admincategory.viewProductDetails(categoryId)
        res.render('user/shopcategory',{admin:false,user:true,userData,product,cartcount,category,user})
    })
}

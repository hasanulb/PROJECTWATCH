const { response } = require('express')
const adminproduct = require('../model/admin-product')
const admincategory = require('../model/admin-category')
const adminbrand = require('../model/brand')
const cart = require("../model/cartmodel")




exports.addproductpage = async (req, res) => {
        res.render("admin/addproduct", { admin: false, user: false });
}

exports.adminproduct = async (req, res) => {
    let cartcount = null
    if(req.session.user){
       cartcount=await cart.getCartCount(req.session.user._id)
    }  
        adminproduct.showproduct().then((product) => {
            res.render("admin/product", { admin: false, user: false ,product,cartcount});
        });
}

exports.viewaddproduct = async (req, res) => {
    admincategory.showcategory().then((category) => {
        adminbrand.showbrand().then((brand) => {
            res.render("admin/addproduct", { admin: false, user: false, category, brand })
        });
    });
}

exports.addproduct = async (req,res) => {
    console.log("qqqq",req.body);
    console.log("111",req.file);
    adminproduct.addproduct(req.body,req.file.path).then((product) => {
        res.render("admin/adminpage",{ admin: false, user: false, product })
    })
}

exports.editproduct = async (req,res) => {
    let productId = req.query.id;
    admincategory.showcategory().then((category) => {
        adminbrand.showbrand().then((brand) => {
        adminproduct.editproduct(productId).then((product)=>{
            res.render("admin/editproduct",{admin: false, user: false , brand ,category , product})
        })
        });
    });
}

exports.updateproduct = async (req,res) => {
    let productId = req.query.id;
    adminproduct.updateproduct(req.body,req.file.path,productId).then((product) => {
        res.render("admin/adminpage",{ admin: true, user: false, product})
    })
}

exports.deleteproduct = async (req,res) => {
    let productId = req.query.id;
    adminproduct.deleteproduct(productId).then((response) => {
    })
}

exports.retriveproduct = async (req,res)=>{
    let productId = req.query.id;
    adminproduct.retriveproduct(productId).then((response) => {
    })
}




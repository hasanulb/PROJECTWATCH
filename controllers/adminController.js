
const adminHelper = require("../model/admin-helper");
const admincategory = require("../model/admin-category");
const userModel = require('../model/adminuser')
const orderModel = require('../model/adminordermodel')

exports.adminHome = async (req, res) => {
    adminHelper.showUser(req.body).then((userDetails) => {
        console.log("wewr",req.body);
        res.render("admin/adminpage", { userDetails, admin: false, user: false });
    });

}


exports.adminLogin = async (req, res) => {
    adminHelper.adminDoLogin(req.body).then((response) => {
        if (response.status) {
            req.session.admin = true;
            adminHelper.showUser(req.body).then((userDetails) => {
                res.render("admin/adminpage", { userDetails, admin: false, user: false });
            });
        } else {
            res.redirect("/admin");
        }
    });
}

exports.addUser = async (req, res) => {

    res.render("admin/adduser", { admin: true, user: false });
}

exports.adminLogout = async (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            res.send("Error")
        } else {
            res.redirect('/login')
        }
    })
}



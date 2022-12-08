const { response } = require('express')
const brand = require('../Model/brand')


exports.brand = async (req, res) => {
    brand.showbrand().then((brand) => {
        res.render("admin/brand", { admin: false, user: false, brand});
    });
}

exports.addbrand = async (req, res) => {
    brand.addbrand(req.body).then((brand) => {
        res.redirect("/admin/brand");
    });
}

exports.deletebrand = (req, res) => {
    const brandId = req.query.id
    brand.deletebrand(brandId).then((response) => {
    })
}

exports.retrivebrand = (req, res) => {
    const brandId = req.query.id
    brand.retrivebrand(brandId).then((response) => {
    })
}

exports.editbrand = (req, res) => {
    const brandId = req.query.id
    brand.editbrand(brandId).then((response) => {
    })
}
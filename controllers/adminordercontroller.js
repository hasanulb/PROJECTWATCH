const adminOrderModel = require('../model/adminordermodel')
const adminCategory = require('../model/admin-category')
const userProfileModel = require("../model/profile")

exports.showOrderPage = (req, res) => {
  adminOrderModel.showOrder().then((orderList) => {
    console.log('this is order list', orderList);
    res.render('admin/adminorder', {
      admin: true,
      title: "ORDER CONTROL PAGE",
      orderList
    })
  })
}
exports.viewOrderProducts = async (req, res) => {
  let orderId = req.query.id
  let orders = await adminOrderModel.showidorder(orderId)
  let products = await userProfileModel.getOrderProductDetails(orderId)
  console.log("eweweweqwewqeqw", products);
  console.log("ppoooo", orders);
  res.render("admin/adminvieworderproducts", { admin: true, title: "VIEW ORDER PRODUCTS", products, orders })
};

exports.updateOrderStatus = async (req, res) => {
  let orderId = req.body.orderId
  let status = req.body.status
  console.log("wqeq", orderId);
  console.log("mmmmm", status);
  await adminOrderModel.updateOrderStatus(orderId, status).then((response) => {
    console.log("rewewee", response);
    res.json(response)
  })
}
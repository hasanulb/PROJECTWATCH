const userModel = require('../Model/')
const orderModel = require('../Model/adminOrderModel')

const chartStatusCount = async(req,res)=>{
  let user = await userModel.displayUser()
  let userlength = user.length
  let chartDetails = await orderModel.chartDetailsCount()
  res.send({chartDetails,userlength})

}
const userModel = require('../model/')
const orderModel = require('../model/adminOrderModel')

const chartStatusCount = async(req,res)=>{
  let user = await userModel.displayUser()
  let userlength = user.length
  let chartDetails = await orderModel.chartDetailsCount()
  res.send({chartDetails,userlength})

}
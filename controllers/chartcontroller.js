const userModel = require('../model/adminuser')
const orderModel = require('../model/adminordermodel')

exports.chartStatusCount = async(req,res)=>{
  let user = await userModel.displayUser()
  let userlength = user.length
  let chartDetails = await orderModel.chartDetailsCount()
  res.send({chartDetails,userlength})

}

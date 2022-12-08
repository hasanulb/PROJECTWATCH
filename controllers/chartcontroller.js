const userModel = require('../Model/adminuser')
const orderModel = require('../Model/adminordermodel')

exports.chartStatusCount = async(req,res)=>{
  let user = await userModel.displayUser()
  let userlength = user.length
  let chartDetails = await orderModel.chartDetailsCount()
  res.send({chartDetails,userlength})

}

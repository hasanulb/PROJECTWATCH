const adminUser = require("../model/adminuser");

const adminUserPage = (req, res) => {
 
    adminUser.displayUser().then((User_Details) => {
      res.render("admin/adminUserPage", {
        admin: true,
        title: "USER CONTROL PAGE",
        User_Details,
      });
    });
  }

  const userBlock = (req,res)=>{
    console.log(req.body.userId);
    console.log("entered here");
    adminUser.blockUser(req.body.userId).then((response)=>{
      res.json({status:true})
    })
  }

  const userUnblock =(req,res)=>{
    adminUser.unblockUser(req.body.userId).then((response)=>{
      res.json({status:true})
    })
  }
module.exports = {
  adminUserPage,
  userBlock,
  userUnblock
};

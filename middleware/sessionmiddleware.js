
  exports.userSessionChecker = (req,res,next)=>{
    if(req.session.loggedIn)
    {
      next()
    }
    else
    {
      console.log('+++++++++++++++++++++++++++++++++++++++= session not clear')
     res.render('user/userlogin',{admin:false,user:false})
    }
  }

  exports.adminSessionChecker = (req,res,next)=>{
    if(req.session.admin){
      next()
    }
    else
    {
      res.render('admin/adminLogin',{admin:false,user:false})
    }
  }

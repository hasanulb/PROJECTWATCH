const userHelper = require("../model/user-helper");
const nodemailer = require("nodemailer");
const cartHelper = require("../model/cartmodel");
const categoryHelper = require("../model/admin-category")



let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hasanulbanna2255@gmail.com",
      pass: "spcaloikohvygydq",
    },
  });

  const OTP = `${Math.floor(1000 + Math.random() * 9000)}`;

exports.home = async (req, res) => { 
    let User = req.session.user 
    console.log("1111",User );
     let cartcount = null
     if(req.session.user){
        cartcount=await cartHelper.getCartCount(req.session.user._id)
     }  
  userHelper.viewproduct().then((product) => {
    res.render("user/userpage", { admin:false, user:true , product,cartcount,User})
  });

}

exports.landingpage = async (req,res) => {
        res.render('user/userlogin',{admin:false, user:false})
    }

exports.login = async (req, res) => {
    userHelper.userDoLogin(req.body).then((response) => {
          if(response.status){
            req.session.loggedIn=true
            req.session.user=response.user
            res.redirect('/home')
          }else{
            res.redirect('/login')
          }
      }); 
}

exports.shop = async (req, res) => {
    let User = req.session.user 
    let products = await cartHelper.getCartProducts(req.session.user._id)  

     console.log("user in product page",User);
     let cartcount = null
     if(req.session.user){
        cartcount=await cartHelper.getCartCount(req.session.user._id)
     }  
        userHelper.viewproduct().then((product) => {
           categoryHelper.showcategory().then((category)=>{
            res.render("user/shop", { admin: false, user: true , product,cartcount,User,category});
           })      
        })
}





exports.productinfo = async (req,res) => {
    let User = req.session.user 
    // let product = await cartHelper.getCartProducts(req.session.user._id)  
    
     let cartcount = null
     if(req.session.user){
        cartcount=await cartHelper.getCartCount(req.session.user._id)
     }  
   let productId = req.query.id
   console.log(productId);
    userHelper.viewoneproduct(productId).then((product) =>{
      console.log("2222",product);
    res.render("user/singleproduct", {admin: false, user: true , product,User,cartcount})
    });
}

exports.signupaccount = async (req, res) => {
    let verified = 0;

  const {username,Email,Password } = req.body;
  let mailDetails = {
    from: "hasanulbanna2255@gmail.com",
    to: Email,
    subject: "PROJECTWATCH",
    html: `<p>YOUR OTP FOR REGISTERING IN projectwatch IS ${OTP}</p>`,
  };
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
    userHelper.doSignup(req.body).then((response) => {
        res.render("user/otp",{ admin: false, user: false });
    });
}
exports.signup = async (req, res) => {
        res.render("user/usersignup", { admin: false, user: false });
}

exports.otp = async (req, res) => {
    res.render("user/otp", { admin: false, user: false });
}

exports.otpverification = async (req,res) => {

  if(OTP == req.body.otp)
  {
    res.redirect("/login");
  }else{
    console.log("otp not matching ");
  }
}


exports.logout = async (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            res.send("error")
        } else {
            res.redirect("/login")
        }
    })
}
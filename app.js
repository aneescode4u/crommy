var express=require("express");
var app=express();

var passport=require("passport");
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
var bodyParser=require("body-parser");
var User=require("./model/user");

var LocalStrategy=require("passport-local");



app.use(require("express-session")({
 secret:"page is used to addd sheet models",
 resave:false,
 saveUninitialized:false
}));



app.use(bodyParser.urlencoded({extended:true}));

var url = require('url');
var PORT = 80;
app.use(express.static("./app/public"));

app.use(express.static("public"));
app.use(express.static(__dirname + '/images'));

app.use(express.static(".app/views/public"));

app.set("view engine","handlebars");
app.engine('handlebars', exphbs());
app.use(bodyParser.urlencoded({extended:true}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes

app.get("/",function(req,res){
    res.render("landing.ejs") });
    app.get("/Home",function(req,res){
    res.render("landing") });

 app.get("/contact",function(req,res){
    res.render("contact.handlebars") });
    
    app.get("/plywood",function(req,res){
    res.render("plywood.ejs")});
    app.get("/WPC",function(req,res){
    res.render("WPC.ejs") });
     app.get("/ACP",function(req,res){
    res.render("ACP.ejs") });
app.get("/ACP#Citybond",function(req,res){
    res.render("ACP#cityBond.ejs") });
    app.get("/HPL",function(req,res){
 res.render("HPL.ejs")});
 

app.get("/about.ejs",function(req,res){
 res.render("about")});
 
app.get("/products",function(req,res){
 res.render("products.ejs")});
 
 app.get("/contents",function(req,res){
 res.render("contents.ejs")});
 
 app.get("/google553b680f2943821a",function(req,res){
 res.sendFile(__dirname+"/google553b680f2943821a.html");
})
  
 
 
 
 
 
 
 
 
 var campgrounds=[
       {
         name:"Wayanad",image:"https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a4479c0b22e5c8a8ed5577c39f63b27b&auto=format&fit=crop&w=1500&q=80"} ,
        { name :"Munnar",image:"https://images.unsplash.com/photo-1470123808288-1e59739dea12?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=65030cebb96d5b92b35bc2141a226edc&auto=format&fit=crop&w=751&q=80"},
         {name :"Kovalam",image :"https://images.unsplash.com/photo-1439507912154-033b3644a7aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f6455df7e8c8b25cffd90bfca9d55881&auto=format&fit=crop&w=752&q=80"},
           ]
 app.get("/",function(req,res){
    res.render("landing.ejs") });
    app.get("/Home",function(req,res){
    res.render("landing.ejs") });

 app.get("/contact",function(req,res){
    res.render("contact.handlebars") });
     app.get("/ReachUs",function(req,res){
    res.render("ReachUs.ejs") });


app.get("/about",function(req,res){
 res.render("about.ejs")});
 
 

app.get("/campgrounds",function(req,res){

   res.render("campgrounds.ejs",{campgrounds:campgrounds});
    
});
app.post("/campgrounds",function(req,res){
 var name=req.body.name;
 var image=req.body.image;
 var newCampground={name:name,image:image};
 campgrounds.push(newCampground);
 res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res)
{
 res.render("new.ejs");
})

 
 
 
 
 



app.get("/login",function(req,res){
    res.render("login") });
    
    
    
    
app.post("/login",passport.authenticate ("local",{
  successRedirect:"/campgrounds/new",
  failureRedirect:"/login"
}),function(req,res){
 
} )  ;
//auth routes


app.get("/register",function(req,res){
   res.render("register.ejs"); 
});



app.get("/careers",function(req,res){res.render("careers")});

app.post("/register.ejs",function(req,res){
  req.body.username
  req.body.password
  User.register(new User({username:req.body.username}), req.body.password, function(err,user){
  if(err){
   console.log(err);
   return res.render('register');
  }
 passport.authenticate("local")(req,res,function(){res.redirect("/campgrounds")})
 })
});
app.get("/logout",function(req,res){
 req.logout();
 res.redirect("/Home")
})
function isLoggedIn(req,res,next){
 if(req.isAuthenticated()){
  return next();
 }
 res.redirect("/login")
}
app.post('/send', (req, res) => {
  console.log(req.body);
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;


  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'info@cromwelldental.co.in',
        pass: ''
    }
});
  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Corbital-ContactUs Request" <info@cromwelldental.co.in>', // sender address
      to: 'info@cromwelldental.co.in', // list of receivers
      subject: 'ContactUs Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });
 app.listen(process.env.PORT||80,function(req,res){
     console.log("The Yelpcamp has Started");
     
 })

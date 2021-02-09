var createError = require('http-errors');
var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('client-sessions');
var nodemailer = require('nodemailer');
var userModel=require("./modules/register");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const request = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(session({
  cookieName: 'session', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  // duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  cookie: {
    ephemeral: true, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));

app.post('/contctus', (req,res)=>{  
  console.log(req.body);
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.send({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }

  // Put your secret key here.
  var secretKey = "6LfnZlAaAAAAAD8buFdV7FjoL9xcm7Gkls9K7vFd";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  

  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // console.log(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
  //  return res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  });


  var name=req.body.name;
  var email = req.body.email;
  var message= req.body.message;

  var html = "<div style='text-align:center;width:100%;margin:20px 0px;float:left;'><img src='https://emeraldparkmemorial.com.au/images/logo.png' style='width:250px;' /></div><br /> ";

 html+= "Name: "+name+"<br>\n<br>\n";
 html+= "Email: "+email+"<br>\n<br>\n";
 html+= "Message: "+message+"<br>\n<br>\n";

 

   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount =  nodemailer.createTestAccount();
 
   // create reusable transporter object using the default SMTP transport
   var transporter = nodemailer.createTransport({
     service: 'gmail',
    secure: false, // true for 465, false for other ports
     debug:true,
     logger:true,
     auth: {
         user: 'info@emeraldparkmemorial.com.au',
         pass: 'Bigfatdog1a!'
     }
     });
 
  //  send mail with defined transport object
   let info =  transporter.sendMail({
     from: email, // sender address
     to: "info@emeraldparkmemorial.com.au", // list of receivers
     subject: "Contact Us", // Subject line
     text: "Contact Us", // plain text body
     html: html // html body
   });
 
 
  return res.json({"responseCode" : 0,"responseDesc" : "Sucess"});

  //  return   res.redirect("/");
    
});

app.post('/', (req,res)=>{
  
  if(req.body.firstname){
    req.session.search_first_name=req.body.firstname;
  }
  if(req.body.lasttname){
    req.session.search_last_name=req.body.lasttname;
  }
  
  



  var first_name=req.body.firstname;
  var last_name=req.body.lasttname;

  var middlen=req.body.middlename;
  var maiden_n=req.body.maiden_name;
 if(req.body.dob){

    var myDate = new Date(req.body.dob); 
    var registerdate=myDate.getDate();  
  var registermonth=myDate.getMonth()+1;  
  var registeryear=myDate.getFullYear(); 
  var dob=  registerdate + "-" + registermonth + "-" + registeryear ;


    req.session.search_dob=dob;
  }else{
    var dob='';
  }
  if(req.body.dod){
    var myDate = new Date(req.body.dod); 
var registerdate=myDate.getDate();  
var registermonth=myDate.getMonth()+1;  
var registeryear=myDate.getFullYear(); 
var dod=  registerdate + "-" + registermonth + "-" + registeryear ;
    req.session.search_dod=dod;
  }else{
    var dod='';
  }

  console.log(dod);
  if(first_name != '' && last_name == "" && middlen == "" &&  maiden_n == "" && dob == "" && dod == "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name});
  }else if(first_name == '' && last_name != "" && middlen == "" &&  maiden_n == "" && dob == "" && dod == "" ){
    var userData= userModel.deceasedData.find({ Lastname : last_name});
  }else if(first_name == '' && last_name == "" && middlen != "" &&  maiden_n == "" && dob == "" && dod == "" ){
    var userData= userModel.deceasedData.find({ Middlename : middlen});
  }else if(first_name == '' && last_name == "" && middlen == "" &&  maiden_n != "" && dob == "" && dod == "" ){
    var userData= userModel.deceasedData.find({ maidanname : maiden_n});
  }else if(first_name == '' && last_name == "" && middlen == "" &&  maiden_n == "" && dob != "" && dod == "" ){
    var userData= userModel.deceasedData.find({ dob : dob});
  }else if(first_name == '' && last_name == "" && middlen == "" &&  maiden_n == "" && dob == "" && dod != "" ){
    var userData= userModel.deceasedData.find({ dod : dod});
  }else if(first_name != '' && last_name != "" && middlen == "" &&  maiden_n == "" && dob == "" && dod != "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name});
  }else if(first_name != '' && last_name != "" && middlen != "" &&  maiden_n == "" && dob == "" && dod != "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name,Middlename : middlen});
  } else if(first_name != '' && last_name != "" && middlen != "" &&  maiden_n != "" && dob == "" && dod != "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name,Middlename : middlen,maidanname : maiden_n});
  }  else if(first_name != '' && last_name != "" && middlen != "" &&  maiden_n != "" && dob != "" && dod == "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name,Middlename : middlen,maidanname : maiden_n ,dob : dob});
  }   else if(first_name != '' && last_name != "" && middlen != "" &&  maiden_n != "" && dob != "" && dod != "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name,Middlename : middlen,maidanname : maiden_n ,dob : dob,dod:dod});
  }   else if(first_name != '' && last_name == "" && middlen == "" &&  maiden_n == "" && dob != "" && dod != "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name,dob : dob,dod:dod});
  } else if(first_name == '' && last_name == "" && middlen == "" &&  maiden_n == "" && dob != "" && dod != "" ){
    var userData= userModel.deceasedData.find({ dob : dob,dod:dod});
  } else if(first_name != '' && last_name == "" && middlen == "" &&  maiden_n == "" && dob == "" && dod != "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name,dod:dod});
  }  else if(first_name == '' && last_name == "" && middlen == "" &&  maiden_n != "" && dob == "" && dod != "" ){
    var userData= userModel.deceasedData.find({ maidanname : maiden_n,dod:dod});
  }  else if(first_name != '' && last_name != "" && middlen != "" &&  maiden_n == "" && dob == "" && dod == "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name,Middlename : middlen});
  }  else if(first_name != '' && last_name != "" && middlen == "" &&  maiden_n != "" && dob == "" && dod == "" ){
    var userData= userModel.deceasedData.find({ Firstname : first_name, Lastname : last_name,maidanname : maiden_n});
  } else{
    var userData= userModel.deceasedData.find({}).limit(10);
  }

  userData.exec((err,data)=>{
   return res.render("search_users",{Alldata: data});
  })
  
  
    

});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.use(session({
  cookieName: 'session', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  // duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  cookie: {
    ephemeral: true, // when true, cookie expires when the browser closes
    httpOnly: true, // when true, cookie is not accessible from javascript
    secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
}));

module.exports = app;

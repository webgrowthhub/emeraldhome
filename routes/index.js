var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userProduct=userModel.productData.find({  product_status : 1 }).limit(20);
  userProduct.exec((errr,Allproductts)=>{
   res.render('index', {usersession: undefined  ,Allproducts: Allproductts});
    
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Product  = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
/* GET home page. */
router.get('/', function(req, res, next) {
Product.find(function(err,docs){
var successMessage = req.flash('success')[0];
res.render('shop/index',{title:'Express',products:docs,successMessage:successMessage,noMessage:!successMessage});
});
 
});


router.get('/add-to-cart/:id',function (req,res,next) {

    var ProductId = req.params.id;

    var cart = new Cart(req.session.cart ? req.session.cart :{});
    Product.findById(ProductId,function (err,product) {
        if(err){
            return res.redirect('/');
        }
    cart.add(product,product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });

});

router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
     return res.render('shop/shopping_cart',{products:null});
  }

  var cart  = new Cart(req.session.cart);
   res.render('shop/shopping_cart',{products:cart.generateArray(), totalPrice:cart.TotalPrice});
});


router.get('/checkout',isLoggedIn,function(req,res,next){
  if(!req.session.cart){
      return res.render('shop/shopping_cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout',{TotalPrice:cart.TotalPrice});

});

router.post('/checkout',isLoggedIn,function(req,res,next){
    if(!req.session.cart){
       return res.render('shop/shopping_cart');
   }
   var cart = new Cart(req.session.cart);

    var order = new Order({
        user : req.user,
        cart :cart,
        f_name : req.body.f_name,
        l_name:req.body.l_name,
        address :req.body.Address,
        phone :req.body.phone,
        city : req.body.city,
        country :req.body.country,
        postal_code:req.body.postal_code



    });
    order.save(function(err,result){
       req.flash('success','Successfully bought Product');
       req.session.cart = null;
       res.redirect('/');
    });

});

router.get('/reduceByOne/:id',function(req,res,next){

   var ProductId = req.params.id;
   var cart = new Cart(req.session.cart? req.session.cart:{});
   cart.reduceByOne(ProductId);
   req.session.cart = cart;
   res.redirect('/shopping-cart');

});

router.get('/removeItem/:id',function(req,res,next){

    var ProductId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart:{});
    cart.removeItem(ProductId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');

});
module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
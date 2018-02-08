var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/shopping');



// Product.findOne({ title: 'Guider' }, function (err, doc){
//   doc.imagepath = '/images/4.png';
//   doc.save();
// });
var products =[ 

       new Product({
      imagepath: '/images/2.png',
       title:'Core II',
       description:'This is Core II',
       price: 340



}),

   new Product({
      imagepath: '/images/3.png',
       title:'Proto',
       description:'This is Proto',
       price: 440



}),

      new Product({
      imagepath: '/images/5.png',
       title:'Proto Plus',
       description:'This is Proto Plus',
       price: 640



}),

         new Product({
      imagepath: '/images/7.png',
       title:'Dreamer',
       description:'This is Dreamer',
       price: 640



}),

            new Product({
      imagepath: '/images/8.png',
       title:'Finder',
       description:'This is Finder',
       price: 940



}),

               new Product({
      imagepath: '/images/9.png',
       title:'Guider',
       description:'This is Guider',
       price: 240



})
];
var done = 0;
for(var i=0; i<products.length; i++){
	products[i].save(function(err,result){
    done++;
    if(done===products.length){
    	exit();
    }

	});
}

function exit(){
	mongoose.disconnect();
}

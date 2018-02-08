var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    user : {type:Schema.Types.ObjectId,ref: 'User'},
    cart : {type:Object,required:true},
    f_name : {type:String,required:true},
    l_name : {type:String,required:true},
    address : {type:String,required:true},
    phone : {type:String,required:true},
    city : {type:String,required:true},
    country : {type:String,required:true},
    postal_code : {type:String,required:true},


});
module.exports = mongoose.model('Order',schema);
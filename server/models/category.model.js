/**
 * Created by zhangyang on 6/11/16.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

/* category model */

var CategorySchema=new Schema({
    category:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Category',CategorySchema);
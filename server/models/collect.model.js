/**
 * Created by zhangyang on 6/18/16.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

/* collect model */

var collectSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    tag:{
        type:Array
    },
    createDate:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('collect',collectSchema);
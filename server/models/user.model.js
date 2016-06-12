/**
 * Created by zhangyang on 5/28/16.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// var crypto=require('crypto');

/* use model */
var UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
});

module.exports=mongoose.model('User',UserSchema);
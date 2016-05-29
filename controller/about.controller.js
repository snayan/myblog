/**
 * Created by zhangyang on 5/28/16.
 */
var user=require('../models/user.model');


//get me info
function about(req,res){
    user.findOne(function(err,user){
        res.json(user);
    });
}

exports.about=about;

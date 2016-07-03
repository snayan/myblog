/**
 * Created by zhangyang on 6/11/16.
 */

var https=require('https');
var blog=require('../models/blog.model');
var Q=require('q');
var _=require('lodash');
var util=require('../util');


// get all tags
exports.getAllTag=function(req,res,next){
    blog.find().select('tags').exec(function(err,tags){
        if(err){
            util.logError(err);
            res.status(500).send(err);
        }
        var result=[];
        _.each(tags,function(tag,index){
            result=_.union(result,tag.get('tags'));
        });
        var finalresult=_.map(result,function (tag) {
            return {"tagName":tag};
        });
        res.send(finalresult);
    });
};

//  get my git project
exports.getPublicGit=function(req,res,next){
    var url="https://api.github.com/users/snayan/repos";
    var req=https.get(url,function(res){
        console.log(res);
        res.on('data',function(data){
            console.log('body:'+data);
        });
    });
    req.on('error',function(err){
        util.logError(err);
        res.status(500).send(err);
    });


};
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
    // var url="https://api.github.com/users/snayan/repos";
    var repos=[];
    var option={
        hostname:'api.github.com',
        path:'/users/snayan/repos',
        headers: {
            'User-Agent': 'snayan'
        }
    };
    var req=https.get(option,function(response) {
        // console.log(res);
        response.on('data', function (chunk) {
            repos.push(chunk);
        });
        response.on('end', function () {
            res.status(200).send(Buffer.concat(repos).toString());
        });
    });
    req.on('error',function(err){
        util.logError(err);
        res.status(500).send(err);
    });

};
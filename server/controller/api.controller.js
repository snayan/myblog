/**
 * Created by zhangyang on 6/11/16.
 */

var blog=require('../models/blog.model');
var Q=require('q');
var _=require('lodash');
var util=require('../util')

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

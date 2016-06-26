/**
 * Created by zhangyang on 6/18/16.
 */

var Q=require('q');
var _=require('lodash');
var collect=require('../models/collect.model');
var util=require('../util');
var config=require('../util/config');

/* collect controller */

// get all collects
exports.getCollects=function (req,res,next) {
    var filter=req.params.filter||false;
    getCollectsByFilter(filter)
        .then(function(collects){
            res.status(200).json(collects);
        })
        .fail(function(err){
            util.handleError(err,res);
        })
        .done();
};

/*
filter:title or tag
*/
function getCollectsByFilter(filter){
    var deferred=Q.defer();
    collect.find(function(err,collects){
       if(err){
           return deferred.reject(err);
       }else{
           if(filter){
               collects=_.filter(collects,function(collect){
                   return _.has(collect.get('title'),filter) || _.has(collect.get('tag').join(),filter);
               });
           }
           deferred.resolve(collects);
       }
    });
    return deferred.promise;
};
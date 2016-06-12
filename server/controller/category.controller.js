/**
 * Created by zhangyang on 6/11/16.
 */

var util=require('../util/index');
var category=require('../models/category.model');
//exports api

exports.getCategory=function(request,response,next){
    category.find().exec(function(err,categorys){
        if(err){
            util.logError(err);
            response.status(500).send(err);
        }
        response.status(200).json(categorys);
    });
}
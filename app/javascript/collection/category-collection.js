/**
 * Created by zhangyang on 6/11/16.
 */

/* category collection */

define([
    'backbone',
    'global',
    'javascript/model/category-model'
],function(Backbone,Global,Category){
    'use strict'
    
    var categoryCollection=Backbone.Collection.extend({
       
        url:Global.api+'/category',
        
        model:Category,
        
        initialize:function(){
            
        },
        
        parse:function(res,option){
            return res;
        }
        
    });
    
    return categoryCollection;
    
});
/**
 * Created by zhangyang on 6/11/16.
 */

/* tag collection */

define([
    'backbone',
    'global',
    'javascript/model/tag-model'
],function(Backbone,Global,tagModel){
    'use strict'
    
    var tagCollection=Backbone.Collection.extend({
        
        model:tagModel,
        
        url:Global.api+'/api/tag',
        
        initialize:function(){
            
        },
        
        parse:function(res,option){
            return res;
        }
        
    });
    
    return tagCollection;
});
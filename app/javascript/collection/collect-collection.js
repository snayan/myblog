/**
 * Created by zhangyang on 6/18/16.
 */

/* collect collection */

define([
    'backbone',
    'global',
    'javascript/model/collect-model'
],function(Backbone,Global,CollectModel){
    'use strict'

    var collectCollection=Backbone.Collection.extend({

        url:Global.api+'/collect',

        model:CollectModel,

        initialize:function(){

        },

        parse:function(res,options){
            return res;
        }

    });

    return collectCollection;

});
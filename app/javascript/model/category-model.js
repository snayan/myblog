/**
 * Created by zhangyang on 6/11/16.
 */

/* category model */

define([
    'backbone'
],function(Backbone){
   'use strict'

    var category=Backbone.Model.extend({

        defaults:{
            category:'',
            number:0
        },

        initialize:function(){

        },

        parse:function(res,option){
            return res;
        }

    });

    return category;
});
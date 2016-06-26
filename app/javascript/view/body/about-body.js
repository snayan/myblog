/**
 * Created by zhangyang on 6/7/16.
 */

/* about view */

define([
    'backbone',
    'templates'
],function (Backbone,JST) {
    'use strict'
   
    var about=Backbone.View.extend({

        template:JST['app/javascript/template/body/about.ejs'],
        
        tagName:'div',

        className:'modal fade about',

        attributes:{
            'role':'dialog',
            'aria-labelledby':'modalDialog'
        },
        
        initialize:function(options){
            
        },
        
        render:function(){
            this.$el.html(this.template());
            return this;
        }

    });
    
    return about;
    
});
/**
 * Created by zhangyang on 6/18/16.
 */

/* collect list view */

define([
    'backbone',
    'templates'
],function (Backbone,JST) {
    'use strict'
    
    var collect_list=Backbone.View.extend({

        template:JST['app/javascript/template/body/content/collect-list.ejs'],

        tagName:'article',
        
        className:'collect-list',
        
        initialize:function(){
            
        },
        
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        
    });
    
    return collect_list;
});
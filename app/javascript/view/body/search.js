/**
 * Created by zhangyang on 6/11/16.
 */

/* search view */

define([
    'underscore',
    'backbone'
],function(_,Backbone){
   'use strict'

    var search=Backbone.View.extend({

        tagName:'div',

        className:'search',

        events:{
            'keydown input':'keydown'
        },

        initialize:function(options){
            
        },

        render:function(){
            var $input=$('<input type="search" class="search-input" placeholder="Search this site..."/>');
            this.$el.append($input);
            return this;
        },

        keydown:function (e) {
            // e.preventDefault();
            if(e.which===13){
                this.trigger('search',this.$('input').val());
            }
        }

    });

    return search;
    
});
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

        },

        initialize:function(){

        },

        render:function(){
            var $input=$('<input type="search" class="search-input" placeholder="Search this site..."/>');
            this.$el.append($input);
            return this;
        }

    });

    return search;
    
});
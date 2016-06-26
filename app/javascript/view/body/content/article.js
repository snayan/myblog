/**
 * Created by zhangyang on 6/13/16.
 */

/* article view */

define([
    'backbone'
],function(Backbone){
    'use strict'

    var article=Backbone.View.extend({

        tagName:"article",

        className:"article",

        events:{

        },

        initialize:function(){

        },

        render:function(){
            this.$el.html(this.model.get('content'));
            return this;
        }

    });

    return article;
});
/**
 * Created by zhangyang on 5/31/16.
 */

/* header view */

define(['backbone','templates'],function(Backbone,JST){
    'use strict'

    var header=Backbone.View.extend({
        
        template:JST['app/javascript/template/header/header.ejs'],

        tagName:'div',

        className:'header',

        events:{

        },

        initialize:function () {

        },

        render:function(){
            this.$el.html(this.template());
            return this;
        }

    });

    return header;
});
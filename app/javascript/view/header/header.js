/**
 * Created by zhangyang on 5/31/16.
 */

/* header view */

define([
    'backbone',
    'templates',
    'global',
    'javascript/view/body/about-body'
],function(Backbone,JST,Global,AboutView){
    'use strict'

    var header=Backbone.View.extend({
        
        template:JST['app/javascript/template/header/header.ejs'],

        tagName:'div',

        className:'header',

        events:{
            'click .about':'about'
        },

        initialize:function () {

        },

        render:function(){
            this.$el.html(this.template());
            return this;
        },

        about:function (e) {
            e.preventDefault();
            Global.router.showModal(new AboutView());
        }

    });

    return header;
});
/**
 * Created by zhangyang on 5/31/16.
 */

/* define base router */

define([
    'jquery',
    'backbone',
    'view/header/header'
],function($,Backbone,Header){

    'use strict'

    Backbone.BaseRouter=Backbone.Router.extend({

        showHeader:function(){
            var header=new Header();
            $('#page-header').html(header.render().el).show();
        },

        show:function(view,options){
            if(!view instanceof Backbone.View){
                return false;
            }
            if(this.currentView){
                this.currentView.remove();
            }
            this.currentView=view;
            $('#page-body').html(view.render().el);
        }

    });

    return this;

});
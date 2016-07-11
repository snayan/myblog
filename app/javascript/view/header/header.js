/**
 * Created by zhangyang on 5/31/16.
 */

/* header view */

define([
    'backbone',
    'templates',
    'global',
    'javascript/view/body/about-body',
    'javascript/view/body/git-body',
    'javascript/view/body/blog-body',
    'javascript/view/body/collect-body'
],function(Backbone,JST,Global,AboutView,GitView,BlogView,CollectView){
    'use strict'

    var header=Backbone.View.extend({

        template:JST['app/javascript/template/header/header.ejs'],

        tagName:'div',

        className:'header',

        events:{
            'click .about':'about',
            'click .git':'git',
            'click .blog':'blog',
            'click .collect':'collect'
        },

        initialize:function () {

        },

        render:function(){
            this.$el.html(this.template());
            return this;
        },

        //  about page
        about:function (e) {
            e.preventDefault();
            Global.router.showModal(new AboutView());
        },

        //  git page
        git:function(e){
            e.preventDefault();
            Global.router.show(new GitView());
        },

        //blog page
        blog:function (e) {
            e.preventDefault();
            Global.router.show(new BlogView());
        },

        //collect page
        collect:function (e) {
            e.preventDefault();
            Global.router.show(new CollectView());
        }

    });

    return header;
});
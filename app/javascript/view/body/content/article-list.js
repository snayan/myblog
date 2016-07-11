/**
 * Created by zhangyang on 6/7/16.
 */

/* article list item view */

define([
    'jquery',
    'backbone',
    'templates',
    'global',
    'javascript/model/article-model',
    'javascript/view/body/content/article'
],function($,Backbone,JST,Global,ArticleModel,ArticleView){
    'use strict'
    
    var article=Backbone.View.extend({
        
        template:JST['app/javascript/template/body/content/article-list.ejs'],
        
        tagName:'article',
        
        className:'article-list',
        
        events:{
            'click a':'openArticle'
        },
        
        initialize:function(){
            
        },
        
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        openArticle:function (e) {
            e.preventDefault();
            var article_model = new ArticleModel({'id': $(e.currentTarget).data('id')});
            article_model.fetch({
                success: function (article, res, option) {
                    var articel_view = new ArticleView({model: article});
                    Global.router.show(articel_view);
                }
            });
        }
        
    });
    
    return article;
});
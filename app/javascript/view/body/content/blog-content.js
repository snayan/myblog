/**
 * Created by zhangyang on 6/7/16.
 */

/* blog home page blog content view */

define([
    'underscore',
    'backbone',
    'javascript/collection/article-collection',
    'javascript/view/body/content/article-list'
],function(_,Backbone,ArticleCollection,ArticleListView){
    
    'use strict'
    
    var content=Backbone.View.extend({
        
        tagName:'div',
        
        className:'blog-content-div',
        
        initialize:function(){
            this.articles=[];
            this.collection=new ArticleCollection();
            this.collection.fetch({reset:true,wait:true});
            this.listenTo(this.collection,'reset',this.render);
        },
        
        render:function(){
            this.addAll();
            return this;
        },

        addOne:function(article){
            var articleView=new ArticleListView({model:article});
            this.articles.push(articleView);
            this.$el.append(articleView.render().$el);
        },

        addAll:function(){
            //delete has exists article view
            _.forEach(this.articles,function(article){
                if(article && article instanceof Backbone.View){
                    article.remove();
                }
            });

            this.articles.length=0;
            this.collection.each(this.addOne,this);
        },

        search:function(value){
            this.collection.fetch({
                wait:true,
                reset:true,
                data:{'search':value}
            });
        }
        
    });
    
    return content;
    
});
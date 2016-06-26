/**
 * Created by zhangyang on 6/12/16.
 */

/* define blog page router */

define([
    'javascript/route/baseRouter',
    'javascript/model/article-model',
    'javascript/view/body/content/article'
],function(BaseRouter,ArticleModel,ArticleView){
   'use strict'

    var blogRouter=BaseRouter.extend({

        routes:{
            'article/:id':'showArticle'
        },

        showArticle:function(id){
            var that=this;
            var article_model=new ArticleModel({id:id});
            article_model.fetch({
                success:function(article,res,option){
                    var articel_view=new ArticleView({model:article});
                    that.show(articel_view);
                }
            });
            
        }

    });

    return blogRouter;

});
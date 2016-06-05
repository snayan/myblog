/**
 * Created by zhangyang on 6/4/16.
 */

/* body view  */

define([
    'backbone',
    './leftdiv',
    './articles'
],function(Backbone,LeftDiv,Articles){
   'use strict'

    var body=Backbone.View.extend({

        tagName:'div',

        className:'body',

        events:{

        },

        initialize:function(){
            this.leftdiv=new LeftDiv();
            this.articles=new Articles();
        },

        render:function(){
            this.$el.append(this.leftdiv.render().$el);
            this.$el.append(this.articles.render().$el);
            return this;
        }
        
    });

    return body;
});
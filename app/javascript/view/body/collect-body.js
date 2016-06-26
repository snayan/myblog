/**
 * Created by zhangyang on 6/18/16.
 */

/* collect view */

define([
    'backbone',
    'javascript/view/body/search',
    'javascript/view/body/content/collect-content'
],function(Backbone,Search,CollectContent){
    'use strict'

    var collect=Backbone.View.extend({

        tagName:'div',

        className:'collect-home',

        initialize:function(){
            this.search=new Search();
            this.content=new CollectContent();
        },

        render:function(){
            this.$el.append(this.search.render().$el);
            this.$el.append(this.content.render().$el);
            return this;
        }

    });

    return collect;
});
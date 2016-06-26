/**
 * Created by zhangyang on 6/18/16.
 */

/* collect-content view */

define([
    'underscore',
    'backbone',
    'javascript/collection/collect-collection',
    'javascript/view/body/content/collect-list'
],function(_,Backbone,CollectCollection,CollectView){
    'use strict'
    
    var collect_content=Backbone.View.extend({
        
        tagName:'div',
        
        className:'collect-content',
        
        initialize:function(){
            this.collects=[];
            this.collection=new CollectCollection();
            this.collection.fetch({reset:true,wait:true});
            this.listenTo(this.collection,'reset',this.render);
        },
        
        render:function () {
            this.addAll();
            return this;
        },
        
        addOne:function(collectModel){
            var cv=new CollectView({model:collectModel});
            this.collects.push(cv);
            this.$el.append(cv.render().$el);
        },
        
        addAll:function(){
            _.each(this.collects,function(collectView){
                if(collectView && collectView instanceof Backbone.View){
                    collectView.remove();
                }
            });
            
            this.collects.length=0;
            this.collection.each(this.addOne,this);
        }
        
    });
    
    return collect_content;
});
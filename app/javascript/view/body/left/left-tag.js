/**
 * Created by zhangyang on 6/11/16.
 */

/* tag view */

define([
    'underscore',
    'backbone',
    'javascript/collection/tag-collection'
],function(_,Backbone,TagCollection){
    'use strict'
   
    var tag=Backbone.View.extend({
       
        tagName:'div',
        
        className:'tag-div',
        
        events:{
            
        },
        
        initialize:function(){
            this.collection=new TagCollection();
            this.collection.fetch({reset:true,wait:true});
            this.listenTo(this.collection,'reset',this.render);
        },
        
        render:function(){
            this.addHeader();
            this.addTag();
            this.$el.html('');
            this.$el.append(this.$header);
            this.$el.append(this.$tags);
            return this;
        },
        
        addHeader:function(){
            this.$header=$('<h4>标签</h4>');
        },
        
        addTag:function(){
            this.$tags=$('<div>');
            this.collection.each(this.addone,this);
        },

        addOne:function(tagModel){
            var $a=$("<a>"),
                size=this.populateSize();
            $a.text(tagModel.get("tagName")).attr("href","").css("fontSize",size);
            this.$tags.append($a);
        },

        populateSize:function(){
            var n=0,
                rnd=Math.random();
            n=Math.ceil(rnd*5);
            return n*10;
        }

    });
    
    return tag;
});
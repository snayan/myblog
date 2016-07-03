/*
git content page
 */

define([
  'underscore',
  'backbone',
  'javascript/collection/gitCollection',
  'javascript/view/body/content/git-list'
], function(_,Backbone, gitCollection,GitView) {
  'use strict'

  var gitContent = Backbone.View.extend({

    tagName:'div',

    className:'git-content',

    events:{

    },

    initialize:function(){
      this.gits=[];
      this.collection=new gitContent();
      this.collection.fetch({wait:true,reset:true});
      this.listentTo(this.collection,'reset',this.render);
    },

    render:function(){
      this.addAll();
      return this;
    },

    addAll:function(){
      _.each(this.gits,function(gitview){
        if(gitview instanceof Backbone.View){
          gitview.remove();
        }
      });

      this.gits.length=0;

      this.collection.each(this.addOne,this);
    },

    addOne:function(gitModel){
      var gv=new GitView({model:gitModel});
      this.gits.push(gv);
      this.$el.append(gv);
    }

  });

  return gitContent;

});
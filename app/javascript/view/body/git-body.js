/**
 * Created by zhangyang on 7/3/16.
 */

/* git page */

define([
  'backbone',
  'javascript/view/body/search',
  'javascript/view/body/content/git-content'
], function(Backbone, Search, GitContent) {

  'use strict'

  var git = Backbone.View.extend({

    tagName: 'div',

    className: 'git-home',

    initialize: function() {
      this.search = new Search();
      this.content = new GitContent();
    },

    render: function() {
      this.$el.append(this.search.render().el);
      this.$el.append(this.content.render().el);
      return this;
    }

  });

  return git;

});
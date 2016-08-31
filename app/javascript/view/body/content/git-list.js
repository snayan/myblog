/*
git view
 */

define([
  'backbone',
  'templates'
], function(Backbone, JST) {
  'use strict'

  var gitView = Backbone.View.extend({

    template: JST['app/javascript/template/body/content/git-list.ejs'],

    tagName: 'div',

    className: 'git-list col-md-4 col-sm-6 col-xs-12',

    events: {},

    initialize: function () {

    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return gitView;

});
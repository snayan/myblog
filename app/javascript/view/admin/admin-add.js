/**
 * Created by zhangyang on 8/23/16.
 */

/** add blog view **/

define([
    'backbone',
    'templates',
    'javascript/view/admin/admin-category',
    'javascript/view/admin/admin-tag'
], function (Backbone, JST, CategoryView, TagView) {

    'use strict';

    var add = Backbone.View.extend({

        template: JST['app/javascript/template/admin/add.ejs'],

        tagName: 'div',

        className: 'ads-add col-md-11 col-sm-10 content',

        events: {},

        initialize: function (options) {
            if (!this.categoryView || !this.categoryView instanceof Backbone.View) {
                this.categoryView = new CategoryView();
            }
            if (!this.tagView || !this.tagView instanceof Backbone.View) {
                this.tagView = new TagView();
            }
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.find('div.categories').html(this.categoryView.render().el);
            this.$el.find('div.tags').html(this.tagView.render().el);
            return this;
        }
    });

    return add;

});
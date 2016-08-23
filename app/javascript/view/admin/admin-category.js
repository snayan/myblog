/**
 * Created by zhangyang on 8/23/16.
 */

/** category view **/

define([
    'underscore',
    'backbone',
    'javascript/collection/category-collection'
], function (_, Backbone, CategoryCollection) {

    'use strict';

    var category = Backbone.View.extend({

        template: _.template('<span class="label label-info category"><%= name %></span>'),

        tagName: 'div',

        className: 'admin-category spanList',

        events: {},

        initialize: function (options) {
            this.collection = new CategoryCollection();
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'add', this.addOne);
            this.collection.fetch({reset: true, wait: true});
        },

        render: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (category) {
            this.$el.append(this.template(category.toJSON()));
        }
    });
    return category;
});
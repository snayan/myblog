/**
 * Created by zhangyang on 8/23/16.
 */

/** tag view **/

define([
    'underscore',
    'backbone',
    'javascript/collection/tag-collection'
], function (_, Backbone, TagCollection) {

    'use strict';

    var tag = Backbone.View.extend({

        template: _.template('<span class="label label-info tag"><%= name %></span>'),

        tagName: 'div',

        className: 'admin-tag spanList',

        events: {},

        initialize: function () {
            this.collection = new TagCollection();
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'add', this.addOne);
            this.collection.fetch({reset: true, wait: true});
        },

        render: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (tag) {
            this.$el.append(this.template(tag.toJSON()));
        }
    });

    return tag;

});
/**
 * Created by zhangyang on 6/11/16.
 */

/* category view */

define([
    'underscore',
    'backbone',
    'javascript/collection/category-collection'
], function (_, Backbone, CategoryCollection) {
    'use strict'

    var category = Backbone.View.extend({

        tagName: 'div',

        className: 'category-div',

        events: {},

        initialize: function () {
            this.collection = new CategoryCollection();
            this.collection.fetch({reset: true, wait: true});
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            this.addHeader();
            this.addUl();
            this.$el.empty();
            this.$el.append(this.$header);
            this.$el.append(this.$ul);
            return this;
        },

        addHeader: function () {
            this.$header = $('<h4>分类</h4>');
        },

        addUl: function () {
            this.$ul = this.collection.length > 0 ? $("<ul>") : $('<div class="tip">博主很懒,暂无分类</div>');
            this.collection.each(this.addLi, this);
        },

        addLi: function (category) {
            var value = category.get('name');
            var numbe = category.get('number') || 0;
            var $a = $("<a>").data('value', value).attr('href', 'void:0');
            $a.html(value + "<span class='badge'>" + numbe + "</span>");
            this.$ul.append($("<li>").html($a));
        }

    });

    return category;
});
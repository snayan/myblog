/**
 * Created by zhangyang on 8/23/16.
 */

/** category view **/

define([
    'jquery',
    'underscore',
    'backbone',
    'javascript/collection/category-collection'
], function ($, _, Backbone, CategoryCollection) {

    'use strict';

    var category = Backbone.View.extend({

        template: _.template('<span class="label label-info category"><%= name %></span>'),

        tagName: 'div',

        className: 'admin-category spanList',

        events: {
            'click span': 'select'
        },

        initialize: function (options) {
            this.collection = new CategoryCollection();
            this.listenTo(this.collection, 'reset', this.render);
            this.collection.fetch({reset: true, wait: true});
            this.on('add', this.add);
            this.on('save', this.save);
        },

        render: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (category) {
            this.$el.append(this.template(category.toJSON()));
        },

        select: function (e) {
            e.preventDefault();
            this.$('span.selected').filter(function () {
                return $(this).text() !== $(e.target).text();
            }).removeClass('label-success').removeClass('selected').addClass('label-info');
            this.$(e.target).toggleClass('selected').toggleClass('label-success').toggleClass('label-info');
        },

        add: function (callback) {
            this.$el.html('<input class="form-control" type="text" placeholder="请输入分类名称" maxlength="100">');
            callback.call(null, true);
        },

        save: function (callback) {
            var $input = this.$('input');
            var v = $input.val().replace(/(\s*)/g, '');
            var l = parseInt($input.attr('maxlength'), 10);
            var reg = typeof l !== 'number' || isNaN(l) || l < 1 ? '^.+$' : '^.{1,' + Math.ceil(l) + '}$';
            if (!new RegExp(reg).test(v)) {
                $input.addClass('error').focus();
                return callback.call(null, false);
            }
            if (!this.collection.has(v)) {
                this.collection.add({name: v, number: 0});
            }
            this.render();
            return callback.call(null, true);
        },

        getValue: function () {
            return this.$('span.selected:first').text();
        }
    });
    return category;
});
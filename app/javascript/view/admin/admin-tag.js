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

        events: {
            'click span': 'select'
        },

        initialize: function () {
            this.collection = new TagCollection();
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

        addOne: function (tag) {
            this.$el.append(this.template(tag.toJSON()));
        },

        add: function (callback) {
            this.$el.html('<input class="form-control" type="text" placeholder="请输入标签名称" maxlength="100">');
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

        select: function (e) {
            e.preventDefault();
            this.$(e.target).toggleClass('selected').toggleClass('label-success').toggleClass('label-info');
        },

        getValue: function () {
            var v = [];
            this.$('span.selected').each(function () {
                v.push($(this).text());
            });
            return v;
        }
    });

    return tag;

});
/**
 * Created by zhangyang on 6/11/16.
 */

/* tag view */

define([
    'underscore',
    'backbone',
    'javascript/collection/tag-collection'
], function (_, Backbone, TagCollection) {
    'use strict'

    var tag = Backbone.View.extend({

        tagName: 'div',

        className: 'tag-div',

        events: {},

        initialize: function () {
            this.collection = new TagCollection();
            this.collection.fetch({reset: true, wait: true});
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            this.addHeader();
            this.addTag();
            this.$el.empty();
            this.$el.append(this.$header);
            this.$el.append(this.$tags);
            return this;
        },

        addHeader: function () {
            this.$header = $('<h4>标签</h4>');
        },

        addTag: function () {
            this.$tags = $('<div>');
            if (this.collection.length === 0) {
                this.$tags.addClass('tip').text('楼主很懒,暂无标签');
            }
            this.collection.each(this.addOne, this);
        },

        addOne: function (tagModel) {
            var $a = $("<a>"),
                size = this.populateSize(),
                tagName = tagModel.get("name");
            $a.text(tagName).attr("href", "").data('value', tagName).css("fontSize", size);
            this.$tags.append($a);
        },

        populateSize: function () {
            var rnd = Math.random(),
                m = Math.ceil(rnd * 2);
            return m * 10 + rnd * 10 + rnd;
        }

    });

    return tag;
});
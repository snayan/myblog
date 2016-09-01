/**
 * Created by zhangyang on 6/7/16.
 */

/* blog home view */

define([
    'backbone',
    'javascript/view/body/left/blog-left',
    'javascript/view/body/content/blog-content',
    'javascript/view/body/search',
    'javascript/view/footer/body-footer'
], function (Backbone, BlogLeft, BlogContent, Search, Footer) {
    'use strict'

    var blogHome = Backbone.View.extend({

        tagName: 'div',

        className: 'blog-home',

        initialize: function () {
            //设置一页显示多少个
            this.showCount = 8;
            //总个数
            this.totalCount = 0;
            //当前页数
            this.currentPage = 1;
            this.model = new Backbone.Model({
                showCount: this.showCount,
                currentPage: this.currentPage,
                totalCount: this.totalCount
            });
            this.footer = new Footer({model: this.model});
            this.left = new BlogLeft();
            this.search = new Search();
            this.content = new BlogContent({model: this.model});
            this.content.listenTo(this.search, 'search', this.content.search);
            this.content.listenTo(this.left, 'search', this.content.search);
            this.content.listenTo(this.footer, 'preOrNext', this.content.preOrNext);
            this.footer.listenTo(this.content, 'reset', this.footer.reset);
        },

        render: function () {
            // var $div=$("<div>");
            // $div.append(this.search.render().$el);
            // $div.append(this.left.render().$el);
            // $div.append(this.content.render().$el);
            // this.$el.html($div.html());
            this.$el.append(this.search.render().$el);
            this.$el.append(this.left.render().$el);
            this.$el.append(this.content.render().$el);
            this.$el.append(this.footer.render().$el);
            return this;
        }

    });

    return blogHome;

});
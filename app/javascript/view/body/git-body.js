/**
 * Created by zhangyang on 7/3/16.
 */

/* git page */

define([
    'backbone',
    'javascript/view/body/search',
    'javascript/view/body/content/git-content',
    'javascript/view/footer/body-footer'
], function (Backbone, Search, GitContent, Footer) {

    'use strict'

    var git = Backbone.View.extend({

        tagName: 'div',

        className: 'git-home',

        initialize: function () {
            //设置一页显示多少个
            this.showCount = 9;
            //总个数
            this.totalCount = 0;
            //当前页数
            this.currentPage = 1;

            this.model = new Backbone.Model({
                showCount: this.showCount,
                currentPage: this.currentPage,
                totalCount: this.totalCount
            });

            this.createSearch();
            this.createList(this.model);
            this.createFooter(this.model);
        },

        render: function () {
            this.$el.append(this.search.render().el);
            this.$el.append(this.content.render().el);
            this.$el.append(this.footer.render().el);
            return this;
        },

        createSearch: function () {
            if (this.existView(this.search)) {
                this.search.remove();
            }
            this.search = new Search();
            this.listenTo(this.search, 'search', this.refreshContent);
        },

        createList: function (model) {
            if (this.existView(this.content)) {
                this.content.remove();
            }
            this.content = new GitContent({model: model});
            this.listenTo(this.content, 'reset', this.refreshFooter);

        },

        createFooter: function (model) {
            if (this.existView(this.footer)) {
                this.footer.remove();
            }
            this.footer = new Footer({model: model});
            this.listenTo(this.footer, 'preOrNext', this.refreshList);
        },

        refreshList: function (model) {
            this.content.trigger('preOrNext', model);
        },

        refreshFooter: function (model) {
            this.footer.trigger('reset', model);
        },

        refreshContent: function (val) {
            this.content.trigger('search', val);
        },

        existView: function (view) {
            return view && view instanceof Backbone.View;
        },

        remove: function () {
            if (this.existView(this.search)) {
                this.search.remove();
            }
            if (this.existView(this.content)) {
                this.content.remove();
            }
            if (this.existView(this.footer)) {
                this.footer.remove();
            }
            Backbone.View.prototype.remove.call(this, arguments);
        }

    });

    return git;

});
/*
 git content page
 */

define([
    'underscore',
    'backbone',
    'loading',
    'javascript/collection/git-collection',
    'javascript/view/body/content/git-list'
], function (_, Backbone, Loading, GitCollection, GitView) {
    'use strict'

    var gitContent = Backbone.View.extend({

        tagName: 'div',

        className: 'git-content',

        events: {},

        initialize: function () {
            this.gits = [];
            this.loading = new Loading(this.el);
            this.collection = new GitCollection();
            this.collection.fetch({
                wait: true,
                reset: true
            });
            this.on('preOrNext', this.addAll);
            this.listenTo(this.collection, 'reset', this.reset);
            this.listenTo(this.collection, 'error', this.error);
            this.loading.showLoading();
        },

        render: function () {
            // this.addAll();
            return this;
        },

        addAll: function (model) {
            _.each(this.gits, function (gitview) {
                if (gitview instanceof Backbone.View) {
                    gitview.remove();
                }
            });

            this.gits.length = 0;
            this.$el.empty();
            var currentPage = model.get('currentPage');
            var showCount = model.get('showCount');
            _.each(this.collection.slice((currentPage - 1) * showCount, currentPage * showCount), this.addOne, this);
        },

        addOne: function (gitModel) {
            var gv = new GitView({model: gitModel});
            this.gits.push(gv);
            this.$el.append(gv.render().el);
        },

        error: function () {
            this.loading.showError();
        },

        reset: function () {
            this.model.set('totalCount', this.collection.length);
            this.model.set('currentPage', 1);
            this.trigger('reset', this.model);
            this.addAll(this.model);
            this.loading.hideLoading();
        }

    });

    return gitContent;

});
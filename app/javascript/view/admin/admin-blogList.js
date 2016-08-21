/**
 * Created by zhangyang on 8/16/16.
 */

/** admin blog list **/

define([
    'backbone',
    'global',
    'backgrid',
    'backbone.paginator',
    'javascript/model/article-model'
], function (Backbone, Global, BackGrid, PageableCollection, ArticleModel) {

    'use strict';

    var list = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-list col-md-11 col-sm-10',

        events: {},

        initialize: function () {
            var ArticleCollection = PageableCollection.extend({
                model: ArticleModel,
                url: Global.api + '/blog/main',
                state: {
                    pageSize: 15
                },
                mode: 'server'
            });
            this.collection = new ArticleCollection();
            if (this.grid && this.grid instanceof Backbone.View) {
                this.grid.remove();
            }
            this.grid = new BackGrid.Grid({
                columns: this.getColumns(),
                collection: this.collection
            });

            this.collection.fetch({reset: true, wait: true});

        },

        render: function () {
            this.$el.html(this.grid.render().$el);
            return this;
        },

        getColumns: function () {
            return [
                {
                    name: 'title',
                    label: '标题',
                    editable: false,
                    cell: 'string'
                },
                {
                    name: 'ifShow',
                    label: '是否显示',
                    editable: false,
                    cell: 'string'
                }, {
                    name: 'createDate',
                    label: '创建时间',
                    editable: false,
                    cell: 'date'
                }, {
                    name: 'seeCount',
                    label: '浏览次数',
                    editable: false,
                    cell: 'integer'
                }]

        }

    });

    return list;

});
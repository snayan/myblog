/**
 * Created by zhangyang on 8/16/16.
 */

/** admin blog list **/

define([
    'backbone',
    'global',
    'backgrid',
    'backbone.paginator',
    'paginator',
    'javascript/model/article-model'
], function (Backbone, Global, BackGrid, PageableCollection, Paginator, ArticleModel) {

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
                    pageSize: 10
                },
                mode: 'server',
                // parseRecords: function (resp) {
                //     // return resp.comments.data;
                // },
            });
            this.collection = new ArticleCollection();
            var paginator = new Backgrid.Extension.Paginator({
                windowSize: 10, // Default is 10
                slideScale: 0.5, // Default is 0.5
                goBackFirstOnSort: true, // Default is true
                collection: this.collection
            });
            if (this.grid && this.grid instanceof Backbone.View) {
                this.grid.remove();
            }
            if (this.paginator && this.paginator instanceof Backbone.View) {
                this.paginator.remove();
            }
            this.grid = new BackGrid.Grid({
                columns: this.getColumns(),
                collection: this.collection
            });
            this.paginator = paginator;

            this.collection.fetch({reset: true, wait: true});

        },

        render: function () {
            this.$el.html(this.grid.render().$el);
            this.$el.append(this.paginator.render().$el);
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
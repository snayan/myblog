/**
 * Created by zhangyang on 8/14/16.
 */

/** admin body view **/

define([
    'backbone',
    'javascript/view/admin/admin-left',
    'javascript/view/admin/admin-blogList'
], function (Backbone, LeftView, BlogListView) {

    'use strict';

    var body = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-body row',

        events: {},

        initialize: function () {
            var nav = '';
            if (this.attributes && this.attributes.nav) {
                nav = this.attributes.nav;
            }
            this.left = new LeftView({model: this.getLeftModel(nav)});
            this.listenTo(this.left, 'action', this.showContent);
        },

        render: function () {
            this.$el.append(this.left.render().$el);
            this.showContent();
            return this;
        },

        getLeftModel: function (nav) {
            var model = {buttons: []};
            switch (nav) {
                case "project":
                    break;
                case "collect":
                    break;
                case "life":
                    break;
                default:
                    model.buttons.push({'name': '列表', 'value': 'list'});
                    model.buttons.push({'name': '新增', 'value': 'add'});
            }
            return model;
        },

        showContent: function (action) {
            if (this.content && this.content instanceof Backbone.View) {
                this.content.remove();
            }
            switch (action) {
                case 'add':
                    break;
                default:
                    this.content = new BlogListView();

            }
            this.$el.append(this.content.render().$el);
        }

    });

    return body;
});
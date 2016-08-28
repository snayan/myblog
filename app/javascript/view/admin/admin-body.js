/**
 * Created by zhangyang on 8/14/16.
 */

/** admin body view **/

define([
    'backbone',
    'global',
    'javascript/view/admin/admin-left',
    'javascript/view/admin/admin-blogList',
    'javascript/view/admin/admin-add'
], function (Backbone, Global, LeftView, BlogListView, AddView) {

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
            var self = this;
            Global.session.auth(function (err) {
                if (err) {
                    setTimeout(function () {
                        Global.router.navigate("/login", {trigger: true, replace: true});
                    }, 0);
                    return false;
                }
                if (self.content && self.content instanceof Backbone.View) {
                    self.content.remove();
                }
                switch (action) {
                    case 'add':
                        self.content = new AddView();
                        break;
                    default:
                        self.content = new BlogListView();

                }
                self.$el.append(self.content.render().$el);
            });
        }

    });

    return body;
});
/**
 * Created by zhangyang on 8/14/16.
 */

/** admin index view **/

define([
    'backbone',
    'global',
    'javascript/view/admin/admin-top',
    'javascript/view/admin/admin-body'
], function (Backbone, Global, TopView, BodyView) {

    'use strict';

    var index = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-index',

        events: {},

        initialize: function () {
            this.top = new TopView();
            this.listenTo(this.top, 'changeBody', this.showBody);
        },

        render: function () {
            this.$el.append(this.top.render().$el);
            this.showBody();
            return this;
        },

        showBody: function (e) {
            if (this.body && this.body instanceof Backbone.View) {
                this.body.remove();
            }
            this.body = new BodyView({"attributes": {"nav": e}});
            this.$el.append(this.body.render().$el);
        }

    });

    return index;

});

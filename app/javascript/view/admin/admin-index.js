/**
 * Created by zhangyang on 8/14/16.
 */

/** admin index view **/

define([
    'backbone',
    'global',
    'javascript/view/admin/admin-person',
    'javascript/view/admin/admin-left',
    'javascript/view/admin/admin-top',
    'javascript/view/admin/admin-body'
], function (Backbone, Global, PersonView, LeftView, TopView, BodyView) {

    'use strict';

    var index = Backbone.View.extend({

        tagName: 'div',

        className: 'admin-index',

        events: {},

        initialize: function () {
            this.person = new PersonView();
            this.left = new LeftView();
            this.top = new TopView();
            this.body = new BodyView();
        },

        render: function () {
            this.$el.append(this.person.render().$el);
            this.$el.append(this.left.render().$el);
            this.$el.append(this.top.render().$el);
            this.$el.append(this.body.render().$el);
            return this;
        }

    });

    return index;

});

/**
 * Created by zhangyang on 7/26/16.
 */

/* admin login page */

define([
    'backbone',
    'templates',
    'global'
], function (Backbone, JST,Global) {
    'use strict';
    var login = Backbone.View.extend({

        template:JST['app/javascript/template/admin/login.ejs'],

        tagName: 'div',

        className: 'admin-login',

        events: {
            'click .login':'login'
        },

        initialize: function () {
            Global.session=null;
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        login:function (e) {

        }


    });
    return login;
});
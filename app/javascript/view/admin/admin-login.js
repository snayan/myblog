/**
 * Created by zhangyang on 7/26/16.
 */

/* admin login page */

define([
    'backbone',
    'templates',
    'global'
], function (Backbone, JST, Global) {
    'use strict';
    var login = Backbone.View.extend({

        template: JST['app/javascript/template/admin/login.ejs'],

        tagName: 'div',

        className: 'admin-login',

        events: {
            'click .login': 'login',
            'keydown': 'keydown'
        },

        initialize: function () {

        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        },

        login: function (e) {
            e.preventDefault();
            var self = this;
            if (!this.validForm()) {
                return false;
            }
            Global.session.login({
                "name": this.$("#name").val(),
                "password": this.$("#password").val()
            }, function (session) {
                Global.router.navigate("/index", {trigger: true, replace: true});
            }, function (error) {
                self.showError(error);
            })

        },

        validForm: function () {
            var name = this.$("#name").val();
            var password = this.$("#password").val();
            if (name.length < 1 || name.length > 20) {
                this.showError('Incorrect username');
                this.$("#name").focus();
                return false;
            }
            if (password.length < 1 || password.length > 20) {
                this.showError('Incorrect password');
                this.$("#password").focus();
                return false;
            }
            return true;
        },

        showError: function (msg) {
            this.$("div.error").fadeIn('slow').text(msg);
        },

        keydown: function (e) {
            if (e.keyCode === 13) {
                this.login(e);
            }
        }


    });
    return login;
});
/**
 * Created by zhangyang on 8/13/16.
 */

/** admin model **/

define([
    'backbone'
], function (Backbone) {

    'use strict';

    var session = Backbone.Model.extend({

        // url: Global.api + "/admin",

        defaults: {
            name: '',
            isAuth: false,
            token: ''
        },

        initialize: function () {

        },

        setTokenInHeader: function (token) {
            Backbone.$.ajaxSetup({
                headers: {
                    'token': token
                }
            });
        },

        setTokenCookie: function (token) {
            this.setCookie('token_snayan_blog', token);
        },

        setCookie: function (name, value, days) {
            var cookies = name + '=' + value;
            if (days != undefined && days != null) {
                var exDate = new Date();
                exDate.setTime(exDate.getTime() + days * 1000 * 60 * 60 * 24);
                cookies = cookies + ';expires=' + exDate.toUTCString();
            }
            document.cookie = cookies;
        },

        getCookie: function (name) {
            var c_start, c_end;
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(name + "=");
                if (c_start != -1) {
                    c_start = c_start + name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return document.cookie.substring(c_start, c_end);
                }
            }
            return "";
        },

        login: function (data, success, fail) {
            var self = this;
            var name = data && data.name ? data.name : '';
            var password = data && data.password ? data.password : '';
            if (name === '' || password === '') {
                this.logout();
                if (typeof fail === "function") {
                    return fail('name or password can not be empty');
                }
                return false;
            }
            $.ajax({
                url: '/admin/login',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify({"name": name, "password": password}),
                beforeSend: function (xhr) {
                    var token = $('meta[name="csrf-token"]').attr('content');
                    if (token)
                        xhr.setRequestHeader('X-CSRF-Token', token);
                },
                success: function (res) {
                    var token = res.token || '';
                    self.setTokenInHeader(token);
                    self.setTokenCookie(token);
                    self.set('isAuth', true);
                    self.set('token', token);
                    self.set('name', name);
                    if (typeof  success === "function") {
                        return success();
                    }
                    return true;
                },
                error: function (res) {
                    self.logout();
                    if (typeof fail === "function") {
                        return fail(res.responseText);
                    }
                    return false;
                }
            });
        },

        logout: function () {
            this.set('isAuth', false);
            this.set('token', '');
            this.setCookie('token_snayan_blog', '');
        },

        auth: function (callback) {
            this.setTokenInHeader(this.getCookie('token_snayan_blog'));
            var self = this;
            $.ajax({
                url: '/admin/auth',
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                success: function (res) {
                    if (res.isAuth) {
                        return callback(null);
                    }
                    self.logout();
                    return callback(new Error('auth fail'));
                },
                error: function (err) {
                    self.logout();
                    return callback(err);
                }
            });
        }


    });

    return session;
});
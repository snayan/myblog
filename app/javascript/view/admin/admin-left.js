/**
 * Created by zhangyang on 8/14/16.
 */

/** admin left operation view **/

define([
    'jquery',
    'backbone',
    'templates'
], function ($, Backbone, JST) {

    'use strict';

    var left = Backbone.View.extend({

        template: JST['app/javascript/template/admin/left.ejs'],

        tagName: 'div',

        className: 'admin-left col-md-1 col-sm-2',

        events: {
            'click a': 'aClick'
        },

        initialize: function () {

        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },

        aClick: function (e) {
            e.preventDefault();
            var $a = $(e.target);
            var $li = $a.parent();
            if($li.hasClass('active')) {
                return false;
            }
            $li.parent().find('li.active').removeClass('active');
            $li.addClass('active');
            this.trigger('action', $a.data('value'));
        }

    });

    return left;

});
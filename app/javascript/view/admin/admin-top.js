/**
 * Created by zhangyang on 8/14/16.
 */

/** admin top operation view **/

define([
    'jquery',
    'backbone',
    'templates'
], function ($, Backbone, JST) {

    'use strict';

    var top = Backbone.View.extend({

        template: JST['app/javascript/template/admin/top.ejs'],

        tagName: 'div',

        className: 'admin-top',

        events: {
            'click a': 'aClick'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        aClick: function (e) {
            e.preventDefault();
            var $a = $(e.target);
            var $li = $a.parent();
            if ($li.hasClass('active')) {
                return false;
            }
            $li.parent().find('li.active').removeClass('active');
            $li.addClass('active');
            this.trigger('changeBody', $a.data('value'));
        }
    });

    return top;
});

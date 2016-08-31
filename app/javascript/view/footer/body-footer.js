/**
 * Created by zhangyang on 8/30/16.
 */

define([
    'jquery',
    'underscore',
    'templates',
    'backbone'
], function ($, _, JST, Backbone) {

    'use strict';

    var bodyFooter = Backbone.View.extend({

        template: JST['app/javascript/template/footer/body-footer.ejs'],

        tagName: 'div',

        className: 'body-footer',

        events: {
            'click a': 'aClick'
        },

        initialize: function (options) {
            this.on('reset', this.reset);
        },

        render: function () {
            return this;
        },

        aClick: function (e) {
            e.preventDefault();
            var $e = this.$(e.target);
            if ($e.parent().hasClass('disabled')) {
                return false;
            }
            var val = this.parseInt($e.data('value'));
            var nextPage = this.model.get('currentPage') + val;
            if (nextPage <= 1 || nextPage >= this.model.get('totalCount') / this.model.get('showCount')) {
                $e.parent().addClass('disabled');

            }
            if (nextPage > 1) {
                this.$('li.previous').removeClass('disabled').removeClass('hide');
            }
            if (nextPage < this.model.get('totalCount') / this.model.get('showCount')) {
                this.$('li.next').removeClass('disabled').removeClass('hide');
            }

            this.model.set('currentPage', nextPage);
            this.trigger('preOrNext', this.model);
        },

        parseInt: function (i) {
            var val = parseInt(i, 10);
            if (typeof val !== 'number' || isNaN(val)) {
                val = 0;
            }
            return val;
        },

        reset: function (model) {
            this.model = model;
            this.$el.html(this.template(model.toJSON()));
        }

    });

    return bodyFooter;
});
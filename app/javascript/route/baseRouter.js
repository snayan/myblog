/**
 * Created by zhangyang on 5/31/16.
 */

/* define base router */

define([
    'jquery',
    'backbone',
    'javascript/view/header/header'
], function ($, Backbone, Header) {

    'use strict';

    var baseRouter = Backbone.BaseRouter = Backbone.Router.extend({

        //header
        showHeader: function () {
            var header = new Header();
            $('#page-header').html(header.render().el).show();
        },

        //body
        show: function (view, options) {
            var $content = $("body div:first");
            if (options && options.isAnimate) {
                $content.hide();
            }
            if (options && options.isLogin) {
                $content.removeClass('page');
            } else {
                $content.addClass('page')
            }
            if (!view instanceof Backbone.View) {
                return false;
            }
            if (this.currentView) {
                this.currentView.remove();
            }
            this.currentView = view;
            $('#page-body').html(view.render().el);
            $content.show('normal');
        },

        //footer
        showFooter: function () {
            //todo:showFooter
        },

        //show modal
        showModal: function (view, options) {
            if (!view instanceof Backbone.View) {
                return false;
            }
            if (this.modalView) {
                this.modalView.$el.modal('hide');
                this.modalView.remove();
            }
            this.modalView = view;
            var $modal = view.render().$el;
            $('body').append($modal);
            $modal.modal('show');
        }


    });

    return baseRouter;

});
/**
 * Created by zhangyang on 8/23/16.
 */

/** add blog view **/

define([
    'jquery',
    'backbone',
    'templates',
    'javascript/view/admin/admin-category',
    'javascript/view/admin/admin-tag',
    'global'
], function ($, Backbone, JST, CategoryView, TagView, Global) {

    'use strict';

    var add = Backbone.View.extend({

        template: JST['app/javascript/template/admin/add.ejs'],

        tagName: 'div',

        className: 'ads-add col-md-11 col-sm-10 content',

        events: {
            'click button.addCategory': 'addCategory',
            'click button.addTag': 'addTag',
            'click button.selectFile': 'selectFile',
            'change input:file': 'showFilePath',
            'click button.save': 'save',
            'keydown #filePath': 'forbid'
        },

        initialize: function (options) {
            if (!this.categoryView || !this.categoryView instanceof Backbone.View) {
                this.categoryView = new CategoryView();
            }
            if (!this.tagView || !this.tagView instanceof Backbone.View) {
                this.tagView = new TagView();
            }
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.find('div.categories').html(this.categoryView.render().el);
            this.$el.find('div.tags').html(this.tagView.render().el);
            return this;
        },

        addCategory: function (e) {
            e.preventDefault();
            var $target = this.$(e.target);
            var type = $target.data('type') || 'add';
            this.categoryView.trigger(type, function (result) {
                if (result) {
                    $target.data('type', type === 'add' ? 'save' : 'add').text(type === 'add' ? '保存' : '新增');
                }
            });
        },

        addTag: function (e) {
            e.preventDefault();
            var $target = this.$(e.target);
            var type = $target.data('type') || 'add';
            this.tagView.trigger(type, function (result) {
                if (result) {
                    $target.data('type', type === 'add' ? 'save' : 'add').text(type === 'add' ? '保存' : '新增');
                }
            });
        },

        selectFile: function (e) {
            e.preventDefault();
            this.$('input:file').click();
        },

        showFilePath: function (e) {
            e.preventDefault();
            var file = this.$(e.target).get(0);
            this.$('#filePath').val(file.files.length ? file.files[0].name : '');
        },

        save: function (e) {
            e.preventDefault();
            var b = true;
            var self = this;
            this.$('input:not(:file):not(:radio)').add('textarea').each(function () {
                var v = $(this).val().replace(/(\s*)/g, '');
                var l = parseInt($(this).attr('maxlength'), 10);
                var regStr = typeof l !== 'number' || isNaN(l) || l < 1 ? '^.+$' : '^.{1,' + Math.ceil(l) + '}$';
                var reg = new RegExp(regStr);
                if (!reg.test(v)) {
                    $(this).addClass('error');
                    b = false;
                }
                else {
                    $(this).removeClass('error')
                }
            });
            if (!b) {
                this.$('.error:first').focus();
                return false;
            }
            var file = this.$('input:file').get(0).files[0] || '';
            if (!/.+\.md$/.test(file.name)) {
                return false;
            }
            var formData = new FormData();
            formData.append('title', this.$('#title').val());
            formData.append('description', this.$('#description').val());
            formData.append('show', this.$('input:radio').val());
            formData.append('category', this.categoryView.getValue());
            formData.append('tags', this.tagView.getValue());
            formData.append('file', this.$('input:file').get(0).files[0]);
            $.ajax({
                url: Global.api + '/blog/main',
                dataType: 'json',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    window.alert('保存成功');
                    self.render();
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },

        forbid: function (e) {
            e.preventDefault();
            return false;
        }
    });

    return add;

});
/**
 * Created by zhangyang on 7/13/16.
 */

var _ = require('lodash');
var fs = require('fs');
var blog = require('./blog.schema');
var blogUtil = require('./blog.util');
var config = require('../../util/config');
var util = require('../../util/index');

/*
 * 获取blog信息
 * @count 数量
 * @filter 过滤条件
 * @callback 回调函数
 * */
function _getBlogs(count, filter, callback) {
    if (!_.isNumber(count)) {
        callback = filter;
        filter = count;
        count = 10;
    }
    count = count + 1;
    if (_.isNull(filter)) {
        filter = ''
    } else {
        filter = filter + '';
    }
    var reg = util.getRegex(filter);
    blog.find({}, function (err, blogs) {
        if (err) {
            return callback(err);
        }
        blogs = _.filter(blogs, function (blog) {
            return reg.test(blog.get('title')) || reg.test(blog.get('description')) || reg.test(blog.get('category')) || reg.test(blog.get('tags').join(''));
        });
        blogs = Array.prototype.splice.call(blogs, 0, count);
        return callback(null, blogs);
    });
}

/*
 * 获取blog详细信息
 * @ID blog的ID
 * @callback 回调函数
 * */
function _getBlogDetail(id, callback) {
    blog.findById(id, function (err, blog) {
        if (err) {
            return callback(err);
        }
        var file = blogUtil.getBlogMDPath(blog);
        fs.access(file, fs.R_OK, function (err) {
            if (err) {
                return callback(err);
            }
            fs.readFile(blogUtil.getBlogHtmlPath(blog), function (err, data) {
                if (err) {
                    blogUtil.md2html(file, function (err, data) {
                        if (err) {
                            return callback(err);
                        }
                        blog.set('body', data.toString());
                        return callback(null, blog);
                    });
                } else {
                    blog.set('body', data.toString());
                    return callback(null, blog);
                }
            });
        });
    });
}

/*
 * 保存blog
 * @data Blog|object
 * @callback 回调函数
 * */
function _saveBlog(data, callback) {
    blog.save(data, function (err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
}

/*
 * 删除blog
 * @data Blog|String|Object
 * @callback 回调函数
 * */
function _deleteBlog(data, callback) {
    blog.delete(data, function (err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
}

/*
 * 获取所有的Category
 * @callback Function
 * */
function _getAllCategory(callback) {
    blog.find({}, function (err, blogs) {
        if (err) {
            return callback(err);
        }
        var results = [];
        var categoris = {}, category = '', count = 0;
        _.each(blogs, function (blog) {
            category = blog.get('category');
            if (category && !_.isEmpty(category)) {
                count = categoris[category];
                categoris[category] = count ? count + 1 : 1;
            }

        });
        _.each(categoris, function (value, name) {
            results.push({"name": name, "number": value})
        });
        return callback(null, results);
    });
}

/*
 * 获取所有的tag
 * @callback Function
 * */
function _getAllTag(callback) {
    blog.find({}, function (err, blogs) {
        if (err) {
            return callback(err);
        }
        var results = [];
        var tags = {}, tag = '', count = 0;
        _.each(blogs, function (blog) {
            tag = blog.get('tags');
            if (tag && !_.isEmpty(tag)) {
                if (_.isArray(tag)) {
                    _.each(tag, function (item) {
                        if (item && !_.isEmpty(item)) {
                            count = tags[item];
                            tags[item] = count ? count + 1 : 1;
                        }
                    });
                } else {
                    count = tags[tag];
                    tags[tag] = count ? count + 1 : 1;
                }
            }

        });
        _.each(tags, function (value, name) {
            results.push({"name": name, "number": value})
        });
        return callback(null, results);
    });
}

exports.getBlogs = _getBlogs;
exports.getBlogDetail = _getBlogDetail;
exports.saveBlog = _saveBlog;
exports.deleteBlog = _deleteBlog;
exports.getAllCategory = _getAllCategory;
exports.getAllTag = _getAllTag;




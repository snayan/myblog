/**
 * Created by zhangyang on 7/13/16.
 */

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var md = require('markdown').markdown;
var marked = require('marked');
var BlogEntity = require('./blog.entity');
var config = require('../../util/config');

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
})

/*
 * md文件转换为html
 * @url md文件路径
 * @callback 回调函数
 * */
function _md2html(url, callback) {
    var buf = new Buffer(0), chunkHtml = null;
    var dist = url.slice(0, url.length - 3) + '.html';
    var ws = fs.createWriteStream(dist, 'utf8');
    var rs = fs.createReadStream(url);
    rs.on('data', function (chunk) {
        // chunkHtml = md.toHTML(chunk.toString());
        chunkHtml = marked(chunk.toString());
        buf = Buffer.concat([buf, new Buffer(chunkHtml, 'utf8')]);
        if (!ws.write(chunkHtml)) {
            rs.pause();
        }
    });
    rs.on('end', function () {
        ws.end();
    });
    rs.on('error', function (err) {
        return callback(err);
    });
    ws.on('drain', function () {
        rs.resume();
    });
    ws.on('finish', function () {
        return callback(null, buf.toString());
    });
    ws.on('error', function (err) {
        return callback(err);
    });
}

/*
 * 生成指定路径的文件夹
 * @URL 路径
 * @callback 回调函数
 * */
function _createDirectory(url, callback) {
    var folder = _parseUrl(url);
    (function createDirectory(folder, callback) {
        if (_.isEmpty(folder)) {
            return callback(null);
        }
        var _current = folder.shift();
        fs.access(_current, function (err) {
            if (err) {
                return fs.mkdir(_current, function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return createDirectory(folder, callback);
                });
            }
            return createDirectory(folder, callback);
        });
    })(folder, callback);
}

/*
 * 解析url成数组
 * url String
 * */
function _parseUrl(url) {
    if (String.prototype.slice.call(url).length === 0) {
        return [];
    }
    var o = url.split('/');
    var oo = [];
    for (var i = 0, j = o.length; i < j; i++) {
        oo.push(o.slice(0, i + 1).join('/'));
    }

    return oo[0] === "" ? oo.slice(1) : oo;
}

/*
 * 根据日期获取blog的文件夹路径
 * @blog Blog
 * */
function _getBlogFloderPath(blog) {
    if (!blog instanceof BlogEntity) {
        blog = new BlogEntity(blog);
    }
    var date = blog.get('createDate');
    if (!_.isDate(date)) {
        date = new Date(date + '');
    }
    if (!_.isDate(date)) {
        date = new Date();
    }
    var y = date.getFullYear() + '';
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m + '';
    return path.join(config.datapath, y, m);
}

/*
 * 根据日期获取blog的路径
 * @blog Blog
 * */
function _getBlogFilePath(blog) {
    if (!blog instanceof BlogEntity) {
        blog = new BlogEntity(blog);
    }
    return path.join(_getBlogFloderPath(blog), blog.get('_id') + '');
}

/*
 * 根据日期获取blog的MD路径
 * @blog Blog
 * */
function _getBlogMDPath(blog) {
    return _getBlogFilePath(blog) + '.md';
}

/*
 * 根据日期获取blog的Html路径
 * @blog Blog
 * */
function _getBlogHtmlPath(blog) {
    return _getBlogFilePath(blog) + '.html';
}

/*
 * 根据blog获取Description
 * @blog Blog
 * */
function _getDescription(blog) {
    var content = '';
    if (blog instanceof BlogEntity) {
        content = blog.get('content');
    } else if (_.isObject(blog) && _.has(blog, 'content')) {
        content = blog.content;
    }
    // var reg=/<p>(.*)<\/p>/;
    return [].slice.call(content, 0, config.descriptionCount).join('');
}


exports.md2html = _md2html;

exports.createDirectory = _createDirectory;

exports.getBlogMDPath = _getBlogMDPath;

exports.getBlogHtmlPath = _getBlogHtmlPath;

exports.getBlogFloderPath = _getBlogFloderPath;

exports.getDescription = _getDescription;


/**
 * Created by zhangyang on 7/13/16.
 */

var _=require('lodash');
var path=require('path');
var fs=require('fs');
var md=require('markdown').markdown;
var BlogEntity=require('./blog.entity');
var config=require('../../util/config');

/*
* md文件转换为html
* @url md文件路径
* @callback 回调函数
* */
function _md2html(url,callback) {
    var buf = new Buffer(0), chunkHtml = null;
    var dist = url.slice(-3) + '.html';
    var ws = fs.createWriteStream(dist, 'utf8');
    var rs = fs.createReadStream(url);
    rs.on('data', function (chunk) {
        chunkHtml = md.toHTML(chunk.toString());
        buf = Buffer.concat([buf, new Buffer(chunkHtml, 'utf8')]);
        if (ws.write(chunkHtml)) {
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
    ws.on('close', function () {
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
function _createDirectory(url,callback){
    var folder = _parseUrl(url);
    (function (folder, callback) {
        var that = arguments.callee;
        if (_.isEmpty(folder)) {
            return callback(null);
        }
        var _current = folder.shift();
        fs.access(_current, function (err) {
            if (err) {
                fs.mkdir(_current, function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return that.call(null, folder, callback);
                });
            }
            return that.call(null, folder, callback);
        });
    })(folder, function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
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
* 根据日期获取blog的路径
* @blog Blog
* */
function _getBlogFilePath(blog) {
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
    return path.join(config.datapath, y, m, blog.get('_id') + '');
}

/*
 * 根据日期获取blog的MD路径
 * @blog Blog
 * */
function _getBlogMDPath(blog){
    return _getBlogFilePath(blog)+'.md';
}

/*
 * 根据日期获取blog的Html路径
 * @blog Blog
 * */
function _getBlogHtmlPath(blog) {
    return _getBlogFilePath(blog) + '.html';
}



exports.md2html=_md2html;

exports.createDirectory=_createDirectory;

exports.getBlogMDPath=_getBlogMDPath;

exports.getBlogHtmlPath=_getBlogHtmlPath;


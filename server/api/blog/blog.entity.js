/**
 * Created by zhangyang on 7/12/16.
 */

var _ = require('lodash');
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var config = require('../../util/config');


function Blog(options) {
    this._path = path.join(config.datapath, 'blog.data.txt');
    this._attribut = {};

    var now = moment().format('YYYY-MM-DD');
    options = options || (options = {});
    if (_.isObject(options)) {
        // options = _.omit(options, '_id');
        options = _.defaultsDeep(options, {
            _id: _createHashId(),
            title: '',
            author: 'snayan',
            description: '',
            createDate: now,
            updateDate: now,
            show: true,
            tags: [],
            category: '',
            meta: {
                seeCount: 0,
                loveCount: 0
            }
        });
    }
    _.extend(this, options);
}

/*
 * 异步保存
 * @callback 回调函数
 * */
Blog.prototype.save = function (callback) {
    callback = callback || (callback = function () {
        });
    var dataUrl = this._path;
    fs.access(dataUrl, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        }
        fs.readFile(dataUrl, 'utf8', function (err, data) {
            if (err) {
                return callback(err);
            }
            try {
                var blogs = JSON.parse(data);
                var hasExist = false;
                blogs = _.map(blogs, function (blog) {
                    hasExist = blog['_id'] === this.get('_id');
                    if (hasExist) {
                        blog = _.extend(blog, this.toJSON());
                    }
                    return blog;
                });
                if (!hasExist) {
                    blogs.push(this.toJSON());
                }
                fs.writeFile(dataUrl, JSON.stringify(blogs), function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, this);
                });
            }
            catch (e) {
                return callback(e);
            }
        });
    });
};

/*
 * 同步保存
 * */
Blog.prototype.saveSync = function () {
    try {
        var dataUrl = this._path;
        var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
        if (exist) {
            var data = fs.readFileSync(dataUrl, 'utf8');
            var blogs = JSON.parse(data);
            var hasExist = false;
            blogs = _.map(blogs, function (blog) {
                hasExist = blog['_id'] === this.get('_id');
                if (hasExist) {
                    blog = _.extend(blog, this.toJSON());
                }
                return blog;
            });
            if (!hasExist) {
                blogs.push(this.toJSON());
            }
            fs.writeFileSync(dataUrl, JSON.stringify(blogs));
            return this;
        }
        return false;
    } catch (e) {
        throw e;
    }
};

/*
 * 异步删除
 * @callback 回调函数
 * */
Blog.prototype.delete = function (callback) {
    callback = callback || (callback = function () {
        });
    var dataUrl = this._path;
    fs.access(dataUrl, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        }
        fs.readFile(dataUrl, 'utf8', function (err, data) {
            if (err) {
                return callback(err);
            }
            try {
                var blogs = JSON.parse(data);
                blogs = _.filter(blogs, function (blog) {
                    var b = true;
                    _.forOwn(this, function (value, key) {
                        b = b && blog[key] === value;
                    });
                    return !b;
                });
                fs.writeFile(dataUrl, JSON.stringify(blogs), function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, this);
                });
            }
            catch (e) {
                return callback(e);
            }
        });
    });
};

/*
 * 同步删除
 * */
Blog.prototype.deleteSync = function () {
    try {
        var dataUrl = this._path;
        var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
        if (exist) {
            var data = fs.readFileSync(dataUrl, 'utf8');
            var blogs = JSON.parse(data);
            blogs = _.filter(blogs, function (blog) {
                var b = true;
                _.forOwn(this, function (value, key) {
                    b = b && blog[key] === value;
                });
                return !b;
            });
            fs.writeFileSync(dataUrl, JSON.stringify(blogs));
            return this;
        }
        return false;
    } catch (e) {
        throw e;
    }
};

/*
 * toJSON
 * */
Blog.prototype.toJSON = function () {
    if (!_.isEmpty(this._attribut)) {
        return this._attribut;
    }
    var values = {};
    _.forOwn(this, function (value, key) {
        values[key] = value;
    });
    this._attribut = _.omit(values, '_path');
    return this._attribut;
};

/*
 * get
 * @name String
 * */
Blog.prototype.get = function (name) {
    if (!_.isEmpty(this._attribut)) {
        return this._attribut[name + ''];
    }
    var blog = this.toJSON();
    return blog[name + ''];
};

/*
 * set
 * @name String
 * @value String|Object|Array
 * */
Blog.prototype.set = function (name, value) {
    this[name + ''] = value;
    this.toJSON();
};

/*
 * 生成_id
 * */
function _createHashId() {
    return moment.now();
}


module.exports = Blog;







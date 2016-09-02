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
    var self = this;
    fs.access(dataUrl, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        }
        fs.readFile(dataUrl, 'utf8', function (err, data) {
            if (err) {
                return callback(err);
            }
            var blogs;
            try {
                blogs = JSON.parse(data);
            }
            catch (e) {
                blogs = [];
            }
            var hasExist = false;
            blogs = _.map(blogs, function (blog) {
                hasExist = blog['_id'] === self.get('_id');
                if (hasExist) {
                    blog = _.extend(blog, self.toJSON());
                }
                return blog;
            }, self);
            if (!hasExist) {
                blogs.push(self.toJSON());
            }
            fs.writeFile(dataUrl, JSON.stringify(blogs), function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null, self);
            });
        });
    });
};

/*
 * 同步保存
 * */
Blog.prototype.saveSync = function () {
    var dataUrl = this._path;
    var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
    if (exist) {
        var data = fs.readFileSync(dataUrl, 'utf8');
        var blogs;
        try {
            blogs = JSON.parse(data);
        }
        catch (e) {
            blogs = [];
        }
        var hasExist = false;
        blogs = _.map(blogs, function (blog) {
            hasExist = blog['_id'] === this.get('_id');
            if (hasExist) {
                blog = _.extend(blog, this.toJSON());
            }
            return blog;
        }, this);
        if (!hasExist) {
            blogs.push(this.toJSON());
        }
        fs.writeFileSync(dataUrl, JSON.stringify(blogs));
        return this;
    }
    return false;
};

/*
 * 异步删除
 * @callback 回调函数
 * */
Blog.prototype.delete = function (callback) {
    callback = callback || (callback = function () {
        });
    var dataUrl = this._path;
    var self = this;
    fs.access(dataUrl, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        }
        fs.readFile(dataUrl, 'utf8', function (err, data) {
            if (err) {
                return callback(err);
            }
            var blogs;
            try {
                blogs = JSON.parse(data);
            }
            catch (e) {
                blogs = [];
            }
            blogs = _.filter(blogs, function (blog) {
                var b = true;
                _.forOwn(self, function (value, key) {
                    b = b && blog[key] === value;
                });
                return !b;
            });
            fs.writeFile(dataUrl, JSON.stringify(blogs), function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null, self);
            });
        });
    });
};

/*
 * 同步删除
 * */
Blog.prototype.deleteSync = function () {
    var dataUrl = this._path;
    var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
    if (exist) {
        var data = fs.readFileSync(dataUrl, 'utf8');
        var blogs;
        try {
            blogs = JSON.parse(data);
        }
        catch (e) {
            blogs = [];
        }
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
};

/*
 * toJSON
 * */
Blog.prototype.toJSON = function () {
    var values = {};
    _.forOwn(this, function (value, key) {
        if (key !== '_path') {
            values[key] = _.cloneDeep(value);
        }
    });
    return _.pick(values, ['_id', 'title', 'author', 'description', 'createDate', 'updateDate', 'show', 'tags', 'category', 'meta']);
};

/*
 * get
 * @name String
 * */
Blog.prototype.get = function (name) {
    return this[name + ''];
};

/*
 * set
 * @name String
 * @value String|Object|Array
 * */
Blog.prototype.set = function (name, value) {
    this[name + ''] = _.cloneDeep(value);
};

/*
 * 生成_id
 * */
function _createHashId() {
    return moment.now();
}


module.exports = Blog;







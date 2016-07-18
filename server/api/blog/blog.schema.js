/**
 * Created by zhangyang on 7/12/16.
 */

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var Blog = require('./blog.entity');
var config = require('../../util/config');

function BlogSchema() {
    this._path = path.join(config.datapath, 'blog.data.txt');
}

/*
 * find
 * @filter Blog|Object|_id
 * @callback Function
 * */
BlogSchema.prototype.find = function (filter, callback) {

    if (!callback) {
        callback = filter;
        filter = {};
    }
    if (!_.isFunction(callback)) {
        callback = function () {
        };
    }
    if (filter instanceof Blog) {
        return callback(null, filter);
    }
    if (_.isNumber(filter)) {
        filter = {"_id": filter}
    }

    var dataUrl = this._path;
    fs.access(dataUrl, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        } else {
            fs.readFile(dataUrl, 'utf8', function (err, data) {
                if (err) {
                    return callback(err);
                } else {
                    try {
                        var collections = JSON.parse(data);
                        var results = _.filter(collections, function (blog) {
                            var b = true;
                            _.forOwn(filter, function (value, key) {
                                if (!b) {
                                    return b;
                                }
                                if (_.isRegExp(value)) {
                                    b = b && value.test(blog[key]);
                                }
                                else {
                                    b = b && blog[key] === value;
                                }

                            });
                            return b;
                        });
                        results = _.map(results, function (data) {
                            return new Blog(data);
                        });
                        return callback(null, results.length == 1 ? results[0] : results);
                    }
                    catch (err) {
                        return callback(err);
                    }
                }
            })
        }
    })
};

/*
 * findSync
 * @filter Blog|Object|_id
 * */
BlogSchema.prototype.findSync = function (filter) {
    if (filter instanceof Blog) {
        return filter;
    }
    if (_.isNumber(filter)) {
        filter = {"_id": filter}
    }
    var dataUrl = this._path;
    try {
        var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
        if (exist) {
            var data = fs.readFileSync(dataUrl, 'utf8');
            var collections = JSON.parse(data);
            var results = _.filter(collections, function (blog) {
                var b = true;
                _.forOwn(filter, function (value, key) {
                    b = b && blog[key] === value;
                });
                return b;
            });
            results = _.map(results, function (data) {
                return new Blog(data);
            });
            return results.length == 1 ? results[0] : results;
        }
        return false;
    } catch (e) {
        throw e;
    }
};

/*
 * findByID
 * @filter String
 * @callback Function
 * */
BlogSchema.prototype.findById = function (filter, callback) {
    var id = _.isNumber(filter) ? filter : parseInt(filter, 10);
    if (!_.isNumber(id) || isNaN(id)) {
        return callback(new Error('invalid id:' + filter));
    }
    return this.find({"_id": id}, callback);
};

/*
 * findByIdSync
 * @filter String
 * @return Blog
 * */
BlogSchema.prototype.findByIdSync = function (filter) {
    var id = _.isNumber(filter) ? filter : parseInt(filter, 10);
    if (!_.isNumber(id) || isNaN(id)) {
        return callback(new Error('invalid id:' + filter));
    }
    return this.findSync({"_id": id});
};

/*
 * 保存
 * @filter Array|Object|Blog
 * @callback Function
 * */
BlogSchema.prototype.save = function (filter, callback) {

    if (!_.isFunction(callback)) {
        callback = function () {
        }
    }
    if (!_.isArray(filter)) {
        filter = [filter];
    }
    var success = 0, total = filter.length;
    var results = [];
    _.each(filter, function (data) {
        var blog = _getBlog(data);
        if (!blog) {
            return callback(new Error('first argument is invalid:can not create blog by first argument'));
        }
        blog.save(function (err, blog) {
            if (err) {
                return callback(err);
            }
            else {
                success = success + 1;
                results.push(blog);
                if (success === total) {
                    results = results.length === 1 ? results[0] : results;
                    return callback(null, results);
                }
            }
        });
    });
};

/*
 * saveSync
 * @filter Array|Object|Blog
 * @return Array|Blog
 * */
BlogSchema.prototype.saveSync = function (filter) {
    if (!_.isArray(filter)) {
        filter = [filter];
    }
    var results = [];
    _.each(filter, function (data) {
        var blog = _getBlog(data);
        if (!blog) {
            throw new Error('first argument is invalid:can not create blog by first argument');
        }
        results.push(blog.saveSync());
    });
    return results.length === 1 ? results[0] : results;
};

/*
 * delete
 * @filter Array|Object|Blog|_id
 * @callback Function
 * */
BlogSchema.prototype.delete = function (filter, callback) {
    if (!_.isArray(filter)) {
        filter = [filter];
    }
    if (!_.isFunction(callback)) {
        callback = function () {
        }
    }
    var innerTotal = 0, total = filter.length;
    var results = [];
    _.each(filter, function (data) {
        total = total - 1;
        this.find(data, function (err, blogs) {
            if (err) {
                return callback(err);
            }
            innerTotal = blogs.length;
            _.each(blogs, function (blog) {
                blog.delete(function (err, blog) {
                    if (err) {
                        return callback(err);
                    }
                    innerTotal = innerTotal - 1;
                    if (!_.contains(results, blog)) {
                        results.push(blog);
                    }
                    if (total === 0 && innerTotal === 0) {
                        return callback(null, results);
                    }
                });
            });
        });
    });
};

/*
 * deleteSync
 * @filter Array|Object|Blog|_id
 * @return Blog
 * */
BlogSchema.prototype.deleteSync = function (filter) {

    if (!_.isArray(filter)) {
        filter = [filter];
    }
    var results = [];
    _.each(filter, function (data) {
        var blogs = this.findSync(data);
        _.each(blogs, function (blog) {
            blog.deleteSync();
            if (!_.contains(results, blog)) {
                results.push(blog);
            }
        });
    });
    return results.length === 1 ? results[0] : results;
};

/*
 * 获取Blog
 * @data Object|Blog|String
 * @return Blog
 * */
function _getBlog(data) {
    if (data instanceof Blog) {
        return data;
    }
    if (_.has(data, '_id') || _.isString(data)) {
        return new BlogSchema().findByIdSync(data['_id']);
    }
    if (_.isObject(data)) {
        return new Blog(data);
    }
    return null;
}

module.exports = new BlogSchema();
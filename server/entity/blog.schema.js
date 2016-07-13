/**
 * Created by zhangyang on 7/12/16.
 */

var _=require('lodash');
var path=require('path');
var fs=require('fs');
var config=require('../util/config');
var Blog=require('./blog.entity');

function BlogSchema() {
    this._path = path.join(config.datapath, 'blog.data.txt');
}

BlogSchema.prototype.find=function (filter,callback) {
    if (_.isFunction(filter)) {
        filter = filter.call(null);
    }
    fs.access(this._path, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        } else {
            fs.readFile(this._path, function (err, data) {
                if (err) {
                    return callback(err);
                } else {
                    try {
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
                        return callback(null, results);
                    }
                    catch (err) {
                        return callback(err);
                    }
                }
            })
        }
    })
};

BlogSchema.prototype.findById=function (filter,callback) {
    if (_.isFunction(filter)) {
        filter = filter.call(null);
    }
    return this.find({"_id": filter + ''}, callback);
};

BlogSchema.prototype.save=function (filter,callback) {
    if (_.isFunction(filter)) {
        filter = filter.call(null);
    }
    if (!_.isArray(filter)) {
        filter = [filter];
    }
    var success = 0, total = filter.length;
    var results = [];
    _.each(filter, function (data) {
        new Blob(data).save(function (err, blog) {
            if (err) {
                return callback(err);
            }
            else {
                success = success + 1;
                results.push(blog);
                if (success === total) {
                    return callback(null, results);
                }
            }
        });
    });
};

BlogSchema.prototype.delete=function (filter,callback) {
    if (_.isFunction(filter)) {
        filter = filter.call(null);
    }
    if (!_.isArray(filter)) {
        filter = [filter];
    }
    var success = 0, total = filter.length;
    var results = [];
    _.each(filter, function (data) {
        new Blog(data).delete(function (err, blog) {
            if (err) {
                return callback(err);
            }
            else {
                success = success  +1;
                results.push(blog);
                if (success === total) {
                    return callback(null, results);
                }
            }
        });
    });
};
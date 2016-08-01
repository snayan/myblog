/**
 * Created by zhangyang on 7/24/16.
 */

var _ = require('lodash');
var moment = require('moment');
var fs = require('fs');
var path = require('path');
var config = require('../../util/config');


function Collect(options) {
    this._path = path.join(config.datapath, 'collect.data.txt');

    var now = moment().format('YYYY-MM-DD');
    options = options || (options = {});
    if (_.isObject(options)) {
        options = _.defaultsDeep(options, {
            _id: _createHashId(),
            title: '',
            author: '',
            description: '',
            createDate: now,
            updateDate: now,
            show: true,
            tags: [],
            category: '',
            url:''
        });
    }
    _.extend(this, options);
}

/*
 * 异步保存
 * @callback 回调函数
 * */
Collect.prototype.save = function (callback) {
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
                var collects = JSON.parse(data);
                var hasExist = false;
                collects = _.map(collects, function (collect) {
                    hasExist = collect['_id'] === this.get('_id');
                    if (hasExist) {
                        collect = _.extend(collect, this.toJSON());
                    }
                    return collect;
                });
                if (!hasExist) {
                    collects.push(this.toJSON());
                }
                fs.writeFile(dataUrl, JSON.stringify(collects), function (err) {
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
Collect.prototype.saveSync = function () {
    try {
        var dataUrl = this._path;
        var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
        if (exist) {
            var data = fs.readFileSync(dataUrl, 'utf8');
            var collects = JSON.parse(data);
            var hasExist = false;
            collects = _.map(collects, function (collect) {
                hasExist = collect['_id'] === this.get('_id');
                if (hasExist) {
                    collect = _.extend(collect, this.toJSON());
                }
                return collect;
            });
            if (!hasExist) {
                collects.push(this.toJSON());
            }
            fs.writeFileSync(dataUrl, JSON.stringify(collects));
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
Collect.prototype.delete = function (callback) {
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
                var collects = JSON.parse(data);
                collects = _.filter(collects, function (collect) {
                    var b = true;
                    _.forOwn(this, function (value, key) {
                        b = b && collect[key] === value;
                    });
                    return !b;
                });
                fs.writeFile(dataUrl, JSON.stringify(collects), function (err) {
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
Collect.prototype.deleteSync = function () {
    try {
        var dataUrl = this._path;
        var exist = fs.accessSync(dataUrl, fs.R_OK | fs.W_OK);
        if (exist) {
            var data = fs.readFileSync(dataUrl, 'utf8');
            var collects = JSON.parse(data);
            collects = _.filter(collects, function (collect) {
                var b = true;
                _.forOwn(this, function (value, key) {
                    b = b && collect[key] === value;
                });
                return !b;
            });
            fs.writeFileSync(dataUrl, JSON.stringify(collects));
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
Collect.prototype.toJSON = function () {
    var values = {};
    _.forOwn(this, function (value, key) {
        if (key !== '_path') {
            values[key] = _.cloneDeep(value);
        }
    });
    return values;
};

/*
 * get
 * @name String
 * */
Collect.prototype.get = function (name) {
    return this[name + ''];
};

/*
 * set
 * @name String
 * @value String|Object|Array
 * */
Collect.prototype.set = function (name, value) {
    this[name + ''] = _.cloneDeep(value);
};

/*
 * 生成_id
 * */
function _createHashId() {
    return moment.now();
}


module.exports = Collect;
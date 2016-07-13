/**
 * Created by zhangyang on 7/12/16.
 */

var _=require('lodash');
var fs=require('fs');
var path=require('path');
var crypto=require('crypto');
var config=require('../util/config');
var util=require('../util/index');


function Blog(options) {
    this._path = path.join(config.datapath, 'blog.data.txt');

    options = options || (options = {});
    if (_.isObject(options)) {
        options = _.defaultsDeep(options, {
            _id: _createHashId(),
            title: '',
            author: '',
            url: '',
            description: '',
            createDate: '',
            updateDate: '',
            show: '',
            tags: [],
            category: '',
            meta: {
                seeCount: '',
                loveCount: ''
            }
        });
    }
    _.forOwn(options, function (value, key) {
        this[key] = value;
    });
}

Blog.prototype.save=function (callback) {
    callback = callback || (callback = function () {});
    fs.access(this._path, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            return callback(err);
        }
        fs.readFile(this._path, function (err, data) {
            if (err) {
                return callback(err);
            }
            try {
                var blogs = JSON.parse(data);
                var hasExist=false;
                blogs=_.map(blogs,function (blog) {
                    hasExist = blog['_id'] === this.get('_id');
                    if (hasExist) {
                        blog = _.extend(blog, this.toJSON());
                    }
                    return blog;
                });
                if(!hasExist) {
                    blogs.push(this.toJSON());
                }
                fs.writeFile(this._path, JSON.stringify(blogs), function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, this);
                });
            }
        });
    });
};

Blog.prototype.delete=function (callback) {
    callback=callback||(callback=function(){});
    fs.access(this._path,fs.R_OK|fs.W_OK,function (err) {
        if(err){
            return callback(err);
        }
        fs.readFile(this._path,function (err,data) {
            if(err){
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
                fs.writeFile(this._path, JSON.stringify(blogs), function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, this);
                });
            }
        });
    });
};

Blog.prototype.toJSON=function () {
    var values = {};
    _.forOwn(this, function (value, key) {
        values[key] = value;
    });
    return JSON.stringify(values);
};

Blog.prototype.get=function (name) {
    var blog = this.toJSON();
    return blog[name + ''];
};

Blog.prototype.set=function (name,value) {
    this[name + ''] = value;
};

function _createHashId() {
    return crypto.randomBytes('64').toString('base64');
}








/**
 * Created by zhangyang on 7/13/16.
 */

var _ = require('lodash');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var controller = require('./blog.controller');
var blogUtil = require('./blog.util');
var multer = require('multer');
var util = require('../../util/index');
var config = require('../../util/config');
var upload = multer({dest: config.root + '/server/uploads/'});

/* GET blog api. */
/* http://snayan.com/blog/ */

router.get('/main', function (req, res) {
    var search = req.query.search || null;
    var page = parseInt(req.query.page);
    var pageSize = parseInt(req.query.per_page);
    if (!_.isNumber(page) || _.isNaN(page)) {
        page = 1;
    }
    if (!_.isNumber(pageSize) || _.isNaN(pageSize)) {
        pageSize = config.showCount || 10;
    }
    var start = (page - 1) * pageSize;
    var end = page * pageSize;
    controller.getBlogs(search, function (err, blogs) {
        if (err) {
            return util.handleError(err, res);
        }
        var total = blogs.length;
        blogs.sort(function (a, b) {
            return a.get('updateDate') - b.get('updateDate');
        });
        console.log('pageSize:' + pageSize);
        console.log('start:' + start);
        console.log('end:' + end);
        blogs = Array.prototype.slice.call(blogs, start, end);
        console.log(blogs);
        return res.status(200).json([{total_entries: total}, blogs]);
    });
});

router.get('/main/:id', function (req, res) {
    var id = req.params.id;
    controller.getBlogDetail(id, function (err, blog) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).json(blog.toJSON());
    });
});

router.post('/main', upload.single('file'), function (req, res) {
    var file = req.file;
    var postData = _.pick(req.body, ['title', 'author', 'description', 'show', 'tags', 'category']);
    if (!_.isArray(postData.tags)) {
        postData.tags = (postData.tags + '').split(',');
    }
    if (!_.isBoolean(postData.show)) {
        postData.show = !!postData.show && postData.show !== '0';
    }
    controller.saveBlog(postData, function (err, blog) {
        if (err) {
            return util.handleError(err, res);
        }
        blogUtil.createDirectory(blogUtil.getBlogFloderPath(blog), function (err) {
            if (err) {
                return util.handleError(err, res);
            }
            fs.rename(file.path, blogUtil.getBlogMDPath(blog), function (err) {
                if (err) {
                    return util.handleError(err, res);
                }
                return res.status(200).json(blog);
                // controller.getBlogDetail(blog.get('_id'), function (err, blog) {
                //     if (err) {
                //         return util.handleError(err, res);
                //     }
                //     blog.set('description', blogUtil.getDescription(blog));
                //     blog.set('content', '');
                //     controller.saveBlog(blog, function (err, blog) {
                //         if (err) {
                //             return util.handleError(err, res);
                //         }
                //         return res.status(200).json(blog);
                //     })
                // })
            })
        });
    });
});

router.delete('/main/:id', function (req, res) {
    var id = req.params.id;
    controller.deleteBlog(id, function (err, blog) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).send('success delete');
    });
});

router.get('/attribute/category', function (req, res) {
    controller.getAllCategory(function (err, categoris) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).json(categoris);
    });
});

router.get('/attribute/tag', function (req, res) {
    controller.getAllTag(function (err, tags) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).json(tags);
    });
});

module.exports = router;

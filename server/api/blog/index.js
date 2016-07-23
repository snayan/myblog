/**
 * Created by zhangyang on 7/13/16.
 */

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var controller = require('./blog.controller');
var util = require('../../util/index');

/* GET blog api. */
/* http://snayan.com/blog/ */

router.get('/main', function (req, res) {
    var search = req.query.search || null;

    controller.getBlogs(10, search, function (err, blogs) {
        if (err) {
            return util.handleError(err, res);
        }
        blogs.sort(function (a, b) {
            return a.get('updateDate') - b.get('updateDate');
        });
        return res.status(200).json(blogs);
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

router.post('/main', function (req, res) {
    controller.saveBlog(req.body, function (err, blog) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).json(blog);
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

router.get('/attribute/category',function (req,res) {
    controller.getAllCategory(function (err, categoris) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).json(categoris);
    });
});

router.get('/attribute/tag',function (req,res) {
    controller.getAllTag(function (err, tags) {
        if (err) {
            return util.handleError(err, res);
        }
        return res.status(200).json(tags);
    });
});

module.exports = router;

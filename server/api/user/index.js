/**
 * Created by zhangyang on 7/15/16.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../../util/config');
var controller = require('./user.controller');

/* GET admin page. */
router.get('/', function (req, res) {
    var options = {
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var indexpath = process.env.NODE_ENV === 'development' ? 'app/admin.html' : 'dist/admin.html';
    res.sendFile(path.join(config.root, indexpath), options);
});

router.post('/login', controller.login);
router.post('/auth', controller.auth);

module.exports = router;
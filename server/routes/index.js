var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../util/config');

/* auth the request */
// router.use(authentication,loadUser);

/* GET home page. */
router.get('/', function (req, res) {
    var options = {
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    console.log('NODE_ENV:' + process.env.NODE_ENV);
    var indexpath = process.env.NODE_ENV === 'development' ? 'app/index.html' : 'dist/index.html';
    res.sendFile(path.join(config.root, indexpath), options);
});

/* GET blog api. */
router.use('/blog', require('../api/blog/index'));

/* GET life api. */
router.use('/life', require('../api/life/index'));

/* GET collect api */
router.use('/collect', require('../api/collect/index'));

/* GET git api. */
router.use('/git', require('../api/git/index'));

/* GET admin api */
router.use('/admin', require('../api/user/index'));



module.exports = router;

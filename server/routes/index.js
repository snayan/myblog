
var express = require('express');
var router = express.Router();
var path=require('path');
var config=require('../util/config');

/* auth the request */
// router.use(authentication,loadUser);

/* GET home page. */
router.get('/', function (req,res) {
    var options = {
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile(path.join(config.root, 'app/index.html'), options);
});

/* GET blog api. */
router.use('/blog',require('../api/blog/index'));

/* GET life api. */
router.use('/life',require('../api/life/index'));

/* GET collect api */
router.use('/collect',require('../api/collect/index'));

/* GET git api. */
router.use('/git',require('../api/git/index'));

/* GET other api */
router.use('/api',require('./api'));


module.exports = router;

var express = require('express');
var router = express.Router();

/* auth the request */
// router.use(authentication,loadUser);

/* GET home page. */
router.get('/', require('./home'));

/* GET blog api. */
router.use('/blog',require('./blog'));

/* GET life api. */
router.use('/life',require('./life'));

/* GET about api. */
router.use('/about',require('./about'));

/* GET category api. */
router.use('/category',require('./category'));

/* GET collect api */
router.use('/collect',require('./collect'));

/* GET other api */
router.use('/api',require('./api'));


module.exports = router;

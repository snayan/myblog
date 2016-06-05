var express = require('express');
var router = express.Router();

/* auth the request */
// router.use(authentication,loadUser);

/* GET home page. */
router.get('/', require('./home'));

/* GET blog page. */
router.use('/blog',require('./blog'));

/* GET life page. */
router.use('/life',require('./life'));

/* GET about page. */
router.use('/about',require('./about'));





module.exports = router;

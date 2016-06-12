/**
 * Created by zhangyang on 5/26/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/home.controller');

/* Get Home api. */
/* http://snayan.com/ */

router.get('/',controller.home);

module.exports=router;
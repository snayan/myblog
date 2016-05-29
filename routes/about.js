/**
 * Created by zhangyang on 5/28/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/about.controller');

/* about me  */

router.get('/',controller.about);

module.exports=router;
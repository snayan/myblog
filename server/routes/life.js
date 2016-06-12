/**
 * Created by zhangyang on 5/28/16.
 */
var express=require('express');
var router=express.Router();
var controller=require('../controller/life.controller');

/* GET life api. */
/* http://snayan.com/life/ */

router.get('/',controller.life);

module.exports=router;

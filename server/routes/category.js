/**
 * Created by zhangyang on 6/11/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/category.controller');

/* get category api. */
/* http://sanyan.com/category/ */

router.get('/',controller.getCategory);


module.exports=router;

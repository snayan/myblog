/**
 * Created by zhangyang on 6/18/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/collect.controller');

/* collect view */
/* http://sanyan.com/collect/  */

router.get('/',controller.getCollects);

router.get('/:filter',controller.getCollects);

module.exports=router;
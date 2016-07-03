/**
 * Created by zhangyang on 6/11/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/api.controller');

router.get('/tag',controller.getAllTag);
router.get('/git',controller.getPublicGit);

module.exports=router;


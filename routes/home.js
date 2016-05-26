/**
 * Created by zhangyang on 5/26/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/home.controller');

/* Get Home Page. */

router.get('/',controller.Home);
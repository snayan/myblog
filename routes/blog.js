/**
 * Created by zhangyang on 5/26/16.
 */

var express=require('express');
var router=express.Router();
var controller=require('../controller/blog.controller');

/* GET blog page. */

router.get('/',controller.tenBlog);

router.get('/:id',controller.oneBlog);

router.post('/',controller.updateBlog);

router.delete('/',controller.deleteBlog);

module.exports=router;


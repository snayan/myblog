/**
 * Created by zhangyang on 5/26/16.
 */

var _=require('lodash');

/* Blog Controller */

/* 获取特定的文章 */
function getOne(id){

};

/* 根据过滤条件获取10篇文章 */
function getTen(filter){
    return 'get ten articles success.';
};

/* 更新特定的文章 */
function updateBlog(article){

};

/* 删除特定的文章 */
function deleteBlog(id){

};

//是否存在
function hasArticle(id){

};

//开发环境输出
function devLog(object){
    if(process.get('env')==='development'){
        console.log(object);
    }
};


//exports API

exports.tenBlog=function (req,res,next) {
    //获取参数
    var rely=req.query.rely||req.params.rely;
    var sort=req.query.sort||req.params.sort;
    var filter=_.defaults({rely:rely,sort:sort},{rely:'time'},{sort:'des'});

    //获取文章
    // var articles=getTen(filter);

    res.send(filter);
};

exports.oneBlog=function (req,res,next) {
    //获取文章ID
    var id=req.query.id||req.params.id;

    //获取文章
    var article=getOne(id);

    res.send(article);

};

exports.updateBlog=function(req,res,next){

    var article=req.body;
    if(hasArticle(article.id)){
        updateBlog(article);
        res.send('update article success.');
    }
    res.send('error:update article.');
};

exports.deleteBlog=function (req,res,next) {
    var id=req.query.id||req.params.id;
    if(hasArticle(id)){
        deleteBlog(id);
        res.send('delete article success.');
    }
    res.send('error:delete article.');
}

/**
 * Created by zhangyang on 5/26/16.
 */

var _=require('lodash');
var fs=require('fs');
var path=require('path');
var markdown=require('markdown').markdown;
var blog=require('../models/blog.model.js');
var util=require('../util/index');

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
    return blog.findById(id);
};

//是否在已经转化好的html
function hasHtml(path){

}

//转换为html,并调用回调函数
function translateHtml(url,callback){
    var dst=path.join(__dirname,util.getDestFile(url));
    var src=path.join(__dirname,url);
    var folder=util.getDestFolder(url);
    //创建相同格式目录的HTML
    (function createFolder(i,length,cb){
        if(i<length){
            var folderPath=path.join(__dirname,folder[i]);
            fs.access(folderPath,function(err){
                if(err){
                    fs.mkdir(folderPath,function(err){
                        if(err){
                            util.logError(err);
                            throw err;
                        }
                        createFolder(i+1,length,cb);
                    });
                }
                else{
                    createFolder(i+1,length,cb);
                }
            });
        }
        else{
            if(_.isFunction(cb)){
                cb.call(null,src,dst,callback);
            }
        }
    })(0,folder.length,md2html);
}

//markdown 转换为 html
function md2html(src,dst,cb){
    try{
        //创建HTML文件
        var rs=fs.createReadStream(src);
        var ws=fs.createWriteStream(dst);
        rs.on('data',function(chunk){
            if(!ws.write(markdown.toHTML(chunk.toString()))){
                rs.pause();
            }
        });
        rs.on('end',function(){
            ws.end();
        });
        rs.on('error',function(error){
            util.logError(error);
            if(_.isFunction(cb)){
                cb.call(null,error);
            }
        });
        ws.on('drain',function(){
            rs.resume();
        });
        ws.on('error',function(error){
            util.logError(error);
            if(_.isFunction(cb)){
                cb.call(null,error);
            }
        });
        ws.on('close',function(){
            if(_.isFunction(cb)){
                cb.call(null,null,dst);
            }
        });
    }catch (e){
        util.logError(e);
        if(_.isFunction(cb)){
            cb.call(null,e);
        }
    }
}

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

    //测试
    blog.findOne(function(err,blog){
        translateHtml(blog.url);
    });

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

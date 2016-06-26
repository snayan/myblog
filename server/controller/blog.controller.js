/**
 * Created by zhangyang on 5/26/16.
 */

var _=require('lodash');
var fs=require('fs');
var path=require('path');
var Q=require('q');
var markdown=require('markdown').markdown;
var blog=require('../models/blog.model.js');
var util=require('../util/index');
var config=require('../util/config');

/* Blog Controller */

/* 获取特定的文章 */
function getOne(id){
    return Q.fcall(function(){
        return blog.findById(id).where({'show':true}).exec(util.standardCB);
    });
};

/* 根据过滤条件获取10篇文章 */
function getTen(search){
    var deferred=Q.defer();
    var reg={$regex:util.getRegex(search),$options:'si'};
    var filter=[];
    filter.push({'title':reg});
    filter.push({'category':reg});
    filter.push({'tags':{$all:[{$elemMatch:reg}]}});

    blog.find({'show':true}).or(filter).limit(10).sort('updateDate')
        .select('title author createDate updateDate show meta description')
        .exec(function(err,blogs){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(blogs);
            }
        });
    return deferred.promise;
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

//translate Html and save blog
function _translateHtml(blog){

    return translateHtml(blog.get('url'))
        .then(function(dist){
            var deferred=Q.defer();
            fs.readFile(dist,function(err,data){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(data);
                }
            });
            return deferred.promise;
        })
        .then(function(body){
            blog.set('body',body);
            return blog.save(util.standardCB);
        });

}

//转换为html,并调用回调函数
function translateHtml(url){
    var dst=path.join(config.root,'server',util.getDistFile(url));
    var src=path.join(config.root,'server',url);
    var folder=util.getDistFolder(url);
    //创建相同格式目录的HTML
    var promise=Q();
    _.each(folder,function(f){
        promise=promise.then(function(){
           return mkdir(path.join(config.root,'server',f));
        });
    });
    return promise.then(function(){
        return md2html(src,dst);
    }).then(function(){
        return dst;
    });
}

//markdown 转换为 html
function md2html(src,dst){
    //创建HTML文件
    var deferred=Q.defer();
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
        deferred.reject(error);
    });
    ws.on('drain',function(){
        rs.resume();
    });
    ws.on('error',function(error){
        deferred.reject(error);
    });
    ws.on('close',function(){
        deferred.resolve(dst);
    });
    return deferred.promise;
}

// mk dir
function mkdir(dir){
    var deferred=Q.defer();
    fs.access(dir,function(err){
        if(err){
            fs.mkdir(dir,function (err) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(dir);
                }
            });
        }else{
            deferred.resolve(dir);
        }
    });
    return deferred.promise;
}

//exports API

exports.tenBlog=function (req,res,next) {
    //获取参数
    var search=req.query.search;
    //获取文章
    getTen(search).then(function(articles){
        res.status(200).json(articles);
    }).fail(function(err){
        util.handleError(err,res);
    }).done();
};

exports.oneBlog=function (req,res,next) {
    //获取文章ID
    var id=req.params.id;

    //获取文章
    getOne(id)
        .then(function(blog) {
            if (!blog) {
                util.handleError(new Error('can not find blog by id :' + id), res);
            }
            return blog.get('body') ? blog : _translateHtml(blog);
        })
        .then(function(blog){
            // blog.delete('body');
            res.status(200).json(blog.toObject({virtuals:true}));
        })
        .fail(function(err){
            util.handleError(err,res);
        }).done();

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
};




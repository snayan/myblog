/**
 * Created by zhangyang on 6/11/16.
 */

var https=require('https');
var path=require('path');
var fs=require('fs');
var blog=require('../models/blog.model');
var Q=require('q');
var _=require('lodash');
var util=require('../util');
var config=require('../util/config');


// get all tags
exports.getAllTag=function(req,res,next){
    blog.find().select('tags').exec(function(err,tags){
        if(err){
            util.logError(err);
            res.status(500).send(err);
        }
        var result=[];
        _.each(tags,function(tag,index){
            result=_.union(result,tag.get('tags'));
        });
        var finalresult=_.map(result,function (tag) {
            return {"tagName":tag};
        });
        res.send(finalresult);
    });
};

//  get my git project
exports.getPublicGit=function(req,res,next) {
    // var url="https://api.github.com/users/snayan/repos";
    var repos = [], showGitForks = config.git.showFork;
    var etag = req.get('If-None-Match');
    var option = _.pick(config.git, ['hostname', 'path']);
    option['headers'] = {
        'User-Agent': 'snayan'
    };
    if (etag) {
        option.headers['If-None-Match'] = etag;
    }
    var req = https.get(option, function (response) {

        var gitEtag = response.headers['etag'];
        if (gitEtag === etag) {
            res.set('ETag', gitEtag);
            return res.status(304).send('data equal');
        }

        response.on('data', function (chunk) {
            repos.push(chunk);
        });
        response.on('end', function () {
            var data = JSON.parse(Buffer.concat(repos).toString());
            repos.length = 0;
            data.forEach(function (git) {
                if (!git.private && (showGitForks || !git.fork)) {
                    repos.push(_.pick(git, ['id', 'name', 'full_name', 'private', 'html_url', 'fork', 'forks_count', 'stargazers_count', 'description', 'created_at', 'updated_at', 'pushed_at', 'homepage', 'size', 'language']));
                }
            });
            repos.sort(function (gita, gitb) {
                var b = gita.fork === gitb.fork;
                if (b) {
                    return new Date(gitb.pushed_at).getTime() - new Date(gita.pushed_at).getTime();
                }
                return gita.fork - gitb.fork;
            });
            res.set('ETag', gitEtag);
            res.status(200).json(repos);
        });
    });
    req.on('error', function (err) {
        util.logError(err);
        res.status(500).send(err);
    });
};

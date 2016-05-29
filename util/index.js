/**
 * Created by zhangyang on 5/29/16.
 */


/* uitl package */


exports.logError=require('./logError');

exports.getDestFile=function(src){
    return parseUrl(src).join('/')+'.html';
};

exports.getDestFolder=function(src){
    var s=parseUrl(src),ss=[];
    s.pop();
    for(var i=0,j=s.length;i<j;i++){
        ss.push(s.slice(0,i+1).join('/'));
    }
    return ss;
};

function parseUrl(url){
    try{
        var m=/^..\/articles\/md\/(\d{4})\/(\d{2})\/(.*)\.md$/.exec(url);
        m.splice(0,1);
        m.unshift('../articles/html');
        return m;
    }
    catch (error){
        exports.logError(error);
    }
}


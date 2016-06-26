/**
 * Created by zhangyang on 5/29/16.
 */

var _=require('lodash');

/* util package */


// log error
exports.logError=require('./logError');

//get dist file
exports.getDistFile=function(src){
    return parseUrl(src).join('/')+'.html';
};

//get dist folder
exports.getDistFolder=function(src){
    var s=parseUrl(src),ss=[];
    s.pop();
    for(var i=0,j=s.length;i<j;i++){
        ss.push(s.slice(0,i+1).join('/'));
    }
    return ss;
};

//get standard call back
exports.standardCB=function(err,result){
    if(err){
        throw err;
    }else{
        return result;
    }
};

//handle error response
exports.handleError=function(err,res){
    this.logError(err);
    res.status(500).send(err);
};

//get regex object
exports.getRegex=function (value) {
    var strReg='',value=_.toArray(value);

    while(value.length) {
        strReg += ".*" + filterSpecialChar(value.shift());
    }
    return new RegExp(strReg);
};

function parseUrl(url){
    try{
        var m=/^\/articles\/md\/(\d{4})\/(\d{2})\/(.*)\.md$/.exec(url);
        m.splice(0,1);
        m.unshift('/articles/html');
        return m;
    }
    catch (error){
        exports.logError(error);
    }
}

//filter special char for regexp
function filterSpecialChar(char) {
    switch (char){
        case "+":
        case ".":
        case "*":
        case "?":
        case "/":
        case "\\":
            char="\\"+char;
            break;
    }
    return char;
}

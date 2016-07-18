/**
 * Created by zhangyang on 5/29/16.
 */

var _=require('lodash');

/* util package */


// log error
exports.logError=require('./logError');

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
    var strReg = '', value = _.toArray(value);

    while (value.length) {
        strReg += ".*" + filterSpecialChar(value.shift());
    }
    return new RegExp(strReg, 'im');
};

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

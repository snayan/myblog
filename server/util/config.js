/**
 * Created by zhangyang on 5/27/16.
 */

var path=require('path');

//系统配置信息
var config={
    mongodb:{
        uri:'mongodb://localhost/myblogs',
        options:{
            db:{
                safe:true
            }
        }
    },
    test:{
        uri:path.join(__dirname,'../../test'),
        if:true
    },
    logpath:path.join(__dirname,'../logs/log.txt'),
    express:{
        port:3000,
        host:'localhost'
    },
    root:path.normalize(__dirname+'/../..')
};

module.exports=config;

/**
 * Created by zhangyang on 5/29/16.
 */
var fs=require('fs');
var path=require('path');
var config=require('./config');

//记录系统异常日志

var logpath=config.logpath||path.join(__dirname,'../logs/log.txt');
var nowDate=new Date();
var now=nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
now=now+' '+nowDate.getHours()+':'+nowDate.getMinutes()+':'+nowDate.getSeconds();

function writeLog(error){
    if(error){
        var msg=now +': '+error.stack+'\n\n';
        fs.access(logpath,fs.F_OK,function(err){
           if(err){
               fs.writeFileSync(logpath,msg);
           }
            else{
               fs.appendFileSync(logpath,msg);
           }
        });
    }
}

function cb(err){
    if(err){
        throw err;
    }
    console.log('write file success.');
}

module.exports=writeLog;
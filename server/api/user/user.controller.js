/**
 * Created by zhangyang on 7/30/16.
 */

var config=require('../../util/config');
var auth=require('../../auth/auth.controller');

exports.login=function (req,res) {
    var crsf=req.headers.crsf||"";
    var name=req.body.name;
    var password=req.body.password;
    if(!name || !password) {
        return res.status(400).send('Bad Request');
    }
    if(crsf!==config.crsf){
        return res.status(400).send('Bad Request');
    }
    if(name!==config.name || password!==config.password) {
        return res.status(401).send("name error or password error");
    }
    res.status(200).send(auth.encrypto());
};

exports.logout=function (req,res) {

};


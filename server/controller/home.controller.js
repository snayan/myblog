/**
 * Created by zhangyang on 5/26/16.
 */

var path=require('path');
var config=require('../util/config');

/* Home Controller */

exports.home=function (req,res,next) {
    var options={
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile(path.join(config.root,'app/index.html'),options);
};
/**
 * Created by zhangyang on 5/26/16.
 */

/* Home Controller */

exports.home=function (req,res,next) {
    res.status(200);
    res.send('Hello Word.');
};
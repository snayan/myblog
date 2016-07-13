/**
 * Created by zhangyang on 5/27/16.
 */

var path=require('path');

//系统配置信息
var config= {
    root: path.normalize(__dirname + '/../..'),
    logpath: path.join(__dirname, '../logs/log.txt'),
    datapath: path.join(__dirname, '../data'),
    express: {
        port: 3000,
        host: 'localhost'
    },
    git: {
        showFork: true,
        hostname: 'api.github.com',
        path: '/users/snayan/repos',
        headers: {
            'User-Agent': 'snayan'
        }
    },
    mongodb: {
        uri: 'mongodb://localhost/myblogs',
        options: {
            db: {
                safe: true
            }
        }
    },
    test: {
        uri: path.join(__dirname, '../../test'),
        if: true
    }
};

module.exports=config;

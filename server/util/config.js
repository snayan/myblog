/**
 * Created by zhangyang on 5/27/16.
 */

var path = require('path');

//系统配置信息
var config = {
    root: path.normalize(__dirname + '/../..'),
    logpath: path.join(__dirname, '../logs/log.txt'),
    datapath: path.join(__dirname, '../data'),
    crsf:'snayan',
    secret:'snayan',
    name:'snayan',
    password:'snayan',
    timeout:5*1000*60*60,
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
        seed: path.join(__dirname, '../../test/seed.js'),
        if: false
    }
};

module.exports = config;

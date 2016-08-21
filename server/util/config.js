/**
 * Created by zhangyang on 5/27/16.
 */

var path = require('path');

//系统配置信息
var config = {
    //根目录
    root: path.normalize(__dirname + '/../..'),
    //日志目录
    logpath: path.join(__dirname, '../logs/log.txt'),
    //数据存储目录
    datapath: path.join(__dirname, '../data'),
    //防跨站点攻击
    crsf: 'snayan',
    //session密钥
    secret: '1234567890123456',
    //用户名
    name: 'snayan',
    //密码
    password: 'snayan',
    //过期时间
    timeout: 5 * 1000 * 60 * 60,
    //首页显示数量
    showCount: 10,
    //express配置
    express: {
        port: 3000,
        host: 'localhost'
    },
    //git配置
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
    //测试配置
    test: {
        seed: path.join(__dirname, '../../test/seed.js'),
        if: false
    }
};

module.exports = config;

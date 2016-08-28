/**
 * Created by zhangyang on 7/30/16.
 */

var crypto = require('crypto');
var config = require('../util/config');
var key = createKey(config.secret);
var iv = createIV();

function isAuthenticated(req, res, next) {
    var token = req.headers.token || "";
    var now = new Date();
    var session = decrypto(token);

    if (!session) {
        return next(new Error('not Authenticated'));
    }
    if (session.timeout < now) {
        return next(new Error('timeout'));
    }
    if (session.name !== config.name) {
        return next(new Error('name error!'));
    }
    if (session.password !== config.password) {
        return next(new Error('password error!'));
    }

    return next(null);
}

function decrypto(token) {
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    var arr = decrypted.split(' ');
    return {
        "timeout": arr[2],
        "password": arr[1],
        "name": arr[0]
    }
}


function encrypto() {
    var expire = config.timeout || -1;
    var end = +(new Date()) + expire;
    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    var encrypted = cipher.update(config.name + " " + config.password + " " + end, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function createIV() {
    return crypto.randomBytes(16);
}

function createKey(secret) {
    var m = crypto.createHash('md5');
    m.update(secret);
    return m.digest();
}

exports.isAuthenticated = isAuthenticated;
exports.encrypto = encrypto;
exports.decrypto = decrypto;
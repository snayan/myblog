/**
 * Created by zhangyang on 7/30/16.
 */

var crypto = require('crypto');
var config = require('../util/config');


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
    var decipher = crypto.createDecipheriv('aes192', config.secret);
    var decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    var arr = decrypted.splice(' ');
    return {
        "timeout": arr[2],
        "password": arr[1],
        "name": arr[0]
    }
}


function encrypto() {
    var end = (new Date()) - config.timeout;
    var cipher = crypto.createCipheriv('aes192', config.secret, createIV());
    var encrypted = cipher.update(config.name + " " + config.password + " " + end, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function createIV(length) {
    length = length || 512;
    return crypto.randomBytes(length);
}

exports.isAuthenticated = isAuthenticated;
exports.encrypto = encrypto;
exports.decrypto = decrypto;
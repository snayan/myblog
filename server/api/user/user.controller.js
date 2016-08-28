/**
 * Created by zhangyang on 7/30/16.
 */

var config = require('../../util/config');
var auth = require('../../auth/auth.controller');

exports.login = function (req, res) {
    var crsf = req.headers['x-csrf-token'] || "";
    var name = req.body.name;
    var password = req.body.password;
    if (!name || !password) {
        return res.status(400).send('Bad Request');
    }
    if (crsf !== config.crsf) {
        return res.status(400).send('Bad Crsf');
    }
    if (name !== config.name || password !== config.password) {
        return res.status(401).send("name error or password error");
    }
    res.status(200).json({"token": auth.encrypto()});
};

exports.auth = function (req, res) {
    var token = req.headers.token || "";
    var now = +new Date();
    var session;
    if (token === '') {
        return res.status(401).send(new Error('not Authenticated'));
    }
    try {
        session = auth.decrypto(token);
    }
    catch (e) {
        console.log(e);
    }

    if (!session) {
        return res.status(401).send(new Error('not Authenticated'));
    }
    if (session.timeout < now) {
        return res.status(401).send(new Error('timeout'));
    }
    if (session.name !== config.name) {
        return res.status(403).send(new Error('name error!'));
    }
    if (session.password !== config.password) {
        return res.status(403).send(new Error('password error!'));
    }
    return res.status(200).json({isAuth: true});
};

exports.logout = function (req, res) {

};



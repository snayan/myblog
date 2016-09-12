/**
 * Created by zhangyang on 9/12/16.
 */

var should = require('chai').should();
var Blog = require('../server/api/blog/blog.entity');

describe('test blog entity', function () {

    var instance = null;

    before('create a blog instance', function () {
        instance = new Blog();
    });

    it('test blog should be Blog instance ', function () {
        instance.should.be.instanceOf(Blog);
    });

    it('test blog should have prototype', function () {
        instance.should.have.property('_id').that.be.a('number');
        instance.should.have.property('title').that.be.a('string');
        instance.should.have.property('author').that.be.a('string');
        instance.should.have.property('description').that.be.a('string');
        instance.should.have.property('createDate').that.be.match(/^\d{4}-\d{2}-\d{2}$/);
        instance.should.have.property('updateDate').that.be.match(/^\d{4}-\d{2}-\d{2}$/);
        instance.should.have.property('show').that.be.an('boolean');
        instance.should.have.property('tags').that.be.instanceOf(Array);
        instance.should.have.property('category').that.be.a('string');
        instance.should.have.property('meta').that.be.a('object').and.that.have.property('seeCount');
        instance.should.have.property('meta').that.be.a('object').and.that.have.property('loveCount');
    });

    it('test blog method save', function (done) {
        instance.set('title', '测试');
        instance.save(function (err) {
            should.not.exist(err);
            instance.get('title').should.be.equal('测试');
            done();
        });
    });

    it('test blog method saveSync', function () {
        instance.set('title', '测试1');
        instance.saveSync().should.be.instanceOf(Blog);
        instance.get('title').should.be.equal('测试1');
    });

    it('test blog method toJSON', function () {
        instance.toJSON().should.be.an('object').and.that.not.include.keys('_path');
    });

    it('test blog method delete', function (done) {
        instance.delete(done);
    });

    it('test blog method deleteSync', function () {
        var instance2 = new Blog();
        instance2.deleteSync().should.be.instanceOf(Blog);
    });

});
/**
 * Created by zhangyang on 9/12/16.
 */

var BlogSchema = require('../server/api/blog/blog.schema');
var Blog = require('../server/api/blog/blog.entity');
var should = require('chai').should();
var fs = require('fs');
var path = require('path');

describe('test blog schema', function () {

    var datapath = (new Blog()).get('_path');
    var blogSchema = BlogSchema;

    before('clean blog data', function (done) {
        fs.writeFile(datapath, '', done);
    });

    after('clean blog data', function (done) {
        fs.writeFile(datapath, '', done);
    });

    it.skip('test blog schema should be object', function () {
        blogSchema.should.be.an('object');
    });

    describe.skip('test blog schema save', function () {

        it('test blog schema method async save used object', function (done) {
            blogSchema.save({'title': '测试1'}, function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('title').should.be.equal('测试1');
                done();
            });
        });

        it('test blog schema method async save used array', function (done) {
            var k = 0;
            blogSchema.save([{'title': '测试2'}, {'title': '测试3'}], function (err, results) {
                should.not.exist(err);
                results.should.be.instanceOf(Array);
                results.length.should.be.equal(2);
                for (var i = 0, j = results.length; i < j; i++) {
                    results[i].should.be.instanceOf(Blog);
                }
                results[0].get('title').should.be.oneOf(['测试2', '测试3']);
                results[1].get('title').should.be.oneOf(['测试2', '测试3']);
                k = k + 1;
                if (k === 4) {
                    done();
                }
            });
            blogSchema.save([{'title': '测试save21'}], function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('title').should.be.equal('测试save21');
                k = k + 1;
                if (k === 4) {
                    done();
                }
            });

            var blog1 = new Blog({'title': '测试save211'});
            var blog2 = new Blog({'title': '测试save212'});
            var blog3 = new Blog({'title': '测试save213'});

            blogSchema.save([blog1], function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('title').should.be.equal('测试save211');
                k = k + 1;
                if (k === 4) {
                    done();
                }
            });

            blogSchema.save([blog2, blog3], function (err, results) {
                should.not.exist(err);
                results.should.be.instanceOf(Array);
                results.length.should.be.equal(2);
                for (var i = 0, j = results.length; i < j; i++) {
                    results[i].should.be.instanceOf(Blog);
                }
                results[0].get('title').should.be.oneOf(['测试save212', '测试save213']);
                results[1].get('title').should.be.oneOf(['测试save212', '测试save213']);
                k = k + 1;
                if (k === 4) {
                    done();
                }
            });
        });

        it('test blog schema method async save used Blog instance', function () {
            blogSchema.save(new Blog({'title': '测试4'}), function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('title').should.be.equal('测试4');
                done();
            });
        });

        it('test blog schema method sync save used object', function () {
            var blog5 = blogSchema.saveSync({'title': '测试5'});
            blog5.should.be.instanceOf(Blog);
            blog5.get('title').should.be.equal('测试5');
        });

        it('test blog schema method sync save used array', function () {
            var results = blogSchema.saveSync([{'title': '测试6'}, {'title': '测试7'}]);
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            for (var i = 0, j = results.length; i < j; i++) {
                results[i].should.be.instanceOf(Blog);
            }
            results[0].get('title').should.be.equal('测试6');
            results[1].get('title').should.be.equal('测试7');
            var blog = blogSchema.saveSync([{'title': '测试66'}]);
            blog.should.be.instanceOf(Blog);
            blog.get('title').should.be.equal('测试66');

            var blog1 = new Blog({'title': '测试save611'});
            var blog2 = new Blog({'title': '测试save612'});
            var blog3 = new Blog({'title': '测试save613'});
            blog = blogSchema.saveSync([blog1]);
            blog.should.be.instanceOf(Blog);
            blog.get('title').should.be.equal('测试save611');
            results = blogSchema.saveSync([blog2, blog3]);
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            for (var i = 0, j = results.length; i < j; i++) {
                results[i].should.be.instanceOf(Blog);
            }
            results[0].get('title').should.be.equal('测试save612');
            results[1].get('title').should.be.equal('测试save613');
        });

        it('test blog schema method sync save used Blog instance', function () {
            var blog = blogSchema.saveSync(new Blog({'title': '测试8'}));
            blog.should.be.instanceOf(Blog);
            blog.get('title').should.be.equal('测试8');
        });
    });

    describe.skip('test blog schema delete', function () {

        it.skip('test blog schema method async delete used _id', function (done) {
            var blog = blogSchema.saveSync(new Blog());
            blogSchema.delete(blog.get('_id'), function (err, return_blog) {
                should.not.exist(err);
                return_blog.should.be.instanceOf(Blog);
                return_blog.get('_id').should.be.equal(blog.get('_id'));
                blogSchema.findSync(blog.get('_id')).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used array like [_id]', function (done) {
            blogSchema.saveSync([{'title': '测试9'}]);
            var ids1 = [];
            ids1.push(blogSchema.findSync({'title': '测试9'}).get('_id'));
            blogSchema.delete(ids1, function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('_id').should.be.equal(ids1[0]);
                blogSchema.findSync(ids1[0]).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used array like [_id,_id]', function (done) {
            blogSchema.saveSync([{'title': '测试10'}, {'title': '测试11'}]);
            var ids2 = [];
            // console.log(blogSchema.findSync);
            ids2.push(blogSchema.findSync({'title': '测试10'}).get('_id'), blogSchema.findSync({'title': '测试11'}).get('_id'));
            blogSchema.delete(ids2, function (err, results) {
                should.not.exist(err);
                results.should.be.instanceOf(Array);
                results.length.should.be.equal(2);
                for (var i = 0, j = results.length; i < j; i++) {
                    results[i].should.be.instanceOf(Blog);
                }
                results[0].get('_id').should.be.equal(ids2[0]);
                results[1].get('_id').should.be.equal(ids2[1]);
                blogSchema.findSync({'title': '测试10'}).length.should.be.equal(0);
                blogSchema.findSync({'title': '测试11'}).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used array like [{}]', function (done) {
            blogSchema.saveSync([{'title': '测试12'}]);
            blogSchema.delete([{'title': '测试12'}], function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blogSchema.findSync({'title': '测试12'}).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used array like [{},{}]', function (done) {
            blogSchema.saveSync([{'title': '测试13'}, {'title': '测试14'}]);
            blogSchema.delete([{'title': '测试13'}, {'title': '测试14'}], function (err, results) {
                should.not.exist(err);
                results.should.be.instanceOf(Array);
                results.length.should.be.equal(2);
                for (var i = 0, j = results.length; i < j; i++) {
                    results[i].should.be.instanceOf(Blog);
                }
                blogSchema.findSync({'title': '测试13'}).length.should.be.equal(0);
                blogSchema.findSync({'title': '测试14'}).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used array like [blog]', function (done) {
            var blog1 = new Blog({'title': '测试delete91'});

            blogSchema.saveSync([blog1]);
            blogSchema.delete([blog1], function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('title').should.be.equal('测试delete91');
                blogSchema.findSync({'title': '测试delete91'}).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used array like [blog,blog]', function (done) {
            var blog2 = new Blog({'title': '测试delete92'});
            var blog3 = new Blog({'title': '测试delete93'});
            blogSchema.saveSync([blog2, blog3]);

            blogSchema.delete([blog2, blog3], function (err, results) {
                should.not.exist(err);
                console.log(results);
                console.log(results.length);
                results.should.be.instanceOf(Array);
                results.length.should.be.equal(2);
                for (var i = 0, j = results.length; i < j; i++) {
                    results[i].should.be.instanceOf(Blog);
                }
                results[0].get('title').should.be.equal('测试delete92');
                results[1].get('title').should.be.equal('测试delete93');
                blogSchema.findSync({'title': '测试delete92'}).length.should.be.equal(0);
                blogSchema.findSync({'title': '测试delete93'}).length.should.be.equal(0);
                done();
            })
        });

        it.skip('test blog schema method async delete used object', function (done) {
            blogSchema.saveSync({'title': '测试15'});
            blogSchema.delete({'title': '测试15'}, function (err, blog) {
                should.not.exist(err);
                // console.log(blog);
                blog.should.be.instanceOf(Blog);
                blogSchema.findSync({'title': '测试15'}).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method async delete used Blog instance', function (done) {
            var blog = new Blog({'title': '测试16'});
            blogSchema.saveSync(blog);
            blogSchema.delete(blog, function (err, return_blog) {
                should.not.exist(err);
                return_blog.should.be.instanceOf(Blog);
                return_blog.get('_id').should.be.equal(blog.get('_id'));
                blogSchema.findSync({'title': '测试16'}).length.should.be.equal(0);
                done();
            });
        });

        it.skip('test blog schema method sync delete used _id', function () {
            var blog1 = new Blog();
            blogSchema.saveSync(blog1);
            var return_blog = blogSchema.deleteSync(blog1);
            return_blog.should.be.instanceOf(Blog);
            return_blog.get('_id').should.be.equal(blog1.get('_id'));
            blogSchema.findSync(return_blog.get('_id')).length.should.be.equal(0);
        });

        it.skip('test blog schema method sync delete used array', function () {
            var blog1 = null, ids = [], results = [];
            blogSchema.saveSync([{'title': '测试17'}, {'title': '测试18'}, {'title': '测试19'}, {'title': '测试20'}, {'title': '测试21'}, {'title': '测试22'}]);
            blog1 = blogSchema.deleteSync([blogSchema.findSync({'title': '测试17'}).get('_id')]);
            blog1.should.be.instanceOf(Blog);
            blog1.get('title').should.be.equal('测试17');
            blogSchema.findSync({'title': '测试17'}).length.should.be.equal(0);

            ids[0] = blogSchema.findSync({'title': '测试18'}).get('_id');
            ids[1] = blogSchema.findSync({'title': '测试19'}).get('_id');
            results = blogSchema.deleteSync(ids);
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            for (var i = 0, j = results.length; i < j; i++) {
                results[i].should.be.instanceOf(Blog);
            }
            results[0].get('title').should.be.equal('测试18');
            results[1].get('title').should.be.equal('测试19');
            blogSchema.findSync({'title': '测试18'}).length.should.be.equal(0);
            blogSchema.findSync({'title': '测试19'}).length.should.be.equal(0);

            blog1 = blogSchema.deleteSync([{'title': '测试20'}]);
            blog1.should.be.instanceOf(Blog);
            blog1.get('title').should.be.equal('测试20');
            blogSchema.findSync({'title': '测试20'}).length.should.be.equal(0);
            results = blogSchema.deleteSync([{'title': '测试21'}, {'title': '测试22'}]);

            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            for (var i = 0, j = results.length; i < j; i++) {
                results[i].should.be.instanceOf(Blog);
            }
            results[0].get('title').should.be.equal('测试21');
            results[1].get('title').should.be.equal('测试22');
            blogSchema.findSync({'title': '测试21'}).length.should.be.equal(0);
            blogSchema.findSync({'title': '测试22'}).length.should.be.equal(0);

            var blog11 = new Blog({'title': '测试delete1911'});
            var blog22 = new Blog({'title': '测试delete1912'});
            var blog33 = new Blog({'title': '测试delete1913'});
            blogSchema.saveSync([blog11, blog22, blog33]);
            blog1 = blogSchema.deleteSync([blog11]);
            blog1.should.be.instanceOf(Blog);
            blog1.get('title').should.be.equal('测试delete1911');
            blogSchema.findSync({'title': '测试delete1911'}).length.should.be.equal(0);
            results = blogSchema.deleteSync([blog22, blog33]);
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            for (var i = 0, j = results.length; i < j; i++) {
                results[i].should.be.instanceOf(Blog);
            }
            results[0].get('title').should.be.equal('测试delete1912');
            results[1].get('title').should.be.equal('测试delete1913');
            blogSchema.findSync({'title': '测试delete1912'}).length.should.be.equal(0);
            blogSchema.findSync({'title': '测试delete1913'}).length.should.be.equal(0);

        });

        it.skip('test blog schema method sync delete used object', function () {
            blogSchema.saveSync({'title': '测试23'});
            var blog1 = blogSchema.deleteSync({'title': '测试23'});
            blog1.should.be.instanceOf(Blog);
            blog1.get('title').should.be.equal('测试23');
            blogSchema.findSync({'title': '测试23'}).length.should.be.equal(0);
        });

        it.skip('test blog schema method sync delete used Blog instance', function () {
            var blog = new Blog();
            blogSchema.saveSync(blog);
            var return_blog = blogSchema.deleteSync(blog);
            return_blog.should.be.instanceOf(Blog);
            return_blog.get('_id').should.be.equal(blog.get('_id'));
            blogSchema.findSync(return_blog.get('_id')).length.should.be.equal(0);
        })

    });

    describe('test blog schema find', function () {

        beforeEach('clean blog data', function (done) {
            fs.writeFile(datapath, '', done);
        });

        it.skip('test blog schema method async find used no filter', function (done) {
            blogSchema.saveSync([{'title': '测试24'}, {'title': '测试25'}]);
            blogSchema.find(function (err, blogs) {
                should.not.exist(err);
                blogs.should.be.instanceOf(Array);
                blogs.length.should.be.equal(2);
                for (var i = 0, j = blogs.length; i < j; i++) {
                    blogs[i].should.be.instanceOf(Blog);
                }
                blogs[0].get('title').should.be.oneOf(['测试24', '测试25']);
                blogs[1].get('title').should.be.oneOf(['测试24', '测试25']);
                done();
            });
        });

        it.skip('test blog schema method async find used {}', function (done) {
            blogSchema.saveSync([{'title': '测试26'}, {'title': '测试27'}]);
            blogSchema.find({}, function (err, blogs) {
                should.not.exist(err);
                blogs.should.be.instanceOf(Array);
                blogs.length.should.be.equal(2);
                for (var i = 0, j = blogs.length; i < j; i++) {
                    blogs[i].should.be.instanceOf(Blog);
                }
                blogs[0].get('title').should.be.oneOf(['测试26', '测试27']);
                blogs[1].get('title').should.be.oneOf(['测试26', '测试27']);
                done();
            });
        });

        it.skip('test blog schema method async find used object', function (done) {
            var k = 0;
            blogSchema.saveSync([{'title': '测试28', 'show': true}, {'title': '测试29', 'show': true}, {
                'title': '测试30',
                'show': false
            }]);
            blogSchema.find({'title': '测试28'}, function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('title').should.be.equal('测试28');
                k = k + 1;
                if (k === 2) {
                    done();
                }
            });
            blogSchema.find({'show': true}, function (err, blogs) {
                should.not.exist(err);
                blogs.should.be.instanceOf(Array);
                blogs.length.should.be.equal(2);
                for (var i = 0, j = blogs.length; i < j; i++) {
                    blogs[i].should.be.instanceOf(Blog);
                }
                blogs[0].get('show').should.be.true;
                blogs[1].get('show').should.be.true;
                k = k + 1;
                if (k === 2) {
                    done();
                }
            });

        });

        it.skip('test blog schema method async find used _id', function (done) {
            var blog1 = new Blog();
            blogSchema.saveSync(blog1);
            blogSchema.find(blog1.get('_id'), function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('_id').should.be.equal(blog1.get('_id'));
                done();
            });
        });

        it.skip('test blog schema method async find used Blog instance', function (done) {
            var blog1 = new Blog();
            blogSchema.saveSync(blog1);
            blogSchema.find(blog1, function (err, blog) {
                should.not.exist(err);
                blog.should.be.instanceOf(Blog);
                blog.get('_id').should.be.equal(blog1.get('_id'));
                done();
            });
        });

        it('test blog schema method sync find used no filter', function () {
            blogSchema.saveSync([{'title': '测试31'}, {'title': '测试32'}]);
            var results = blogSchema.findSync();
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            results[0].get('title').should.be.oneOf(['测试31', '测试32']);
            results[1].get('title').should.be.oneOf(['测试31', '测试32']);
        });

        it('test blog schema method sync find used {}', function () {
            blogSchema.saveSync([{'title': '测试33'}, {'title': '测试34'}]);
            var results = blogSchema.findSync({});
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            results[0].get('title').should.be.oneOf(['测试33', '测试34']);
            results[1].get('title').should.be.oneOf(['测试33', '测试34']);
        });

        it('test blog schema method sync find used object', function () {
            blogSchema.saveSync([{'title': '测试35', 'show': true}, {'title': '测试36', 'show': true}, {
                'title': '测试37',
                'show': false
            }]);
            var blog = blogSchema.findSync({'title': '测试35'});
            blog.should.be.instanceOf(Blog);
            blog.get('title').should.be.equal('测试35');
            var results = blogSchema.findSync({'show': true});
            results.should.be.instanceOf(Array);
            results.length.should.be.equal(2);
            results[0].get('show').should.be.true;
            results[1].get('show').should.be.true;
        });

        it('test blog schema method sync find used _id', function () {
            var blog = new Blog();
            blogSchema.saveSync(blog);
            var return_blog = blogSchema.findSync(blog.get('_id'));
            return_blog.should.be.instanceOf(Blog);
            return_blog.get('_id').should.be.equal(blog.get('_id'));
        });

        it('test blog schema method sync find used Blog instance', function () {
            var blog = new Blog();
            blogSchema.saveSync(blog);
            var return_blog = blogSchema.findSync(blog);
            return_blog.should.be.instanceOf(Blog);
            return_blog.get('_id').should.be.equal(blog.get('_id'));
        });

    });

    describe('test blog schema findById', function () {

        it('test blog schema method async findById used _id ', function (done) {
            var blog = new Blog();
            blogSchema.saveSync(blog);
            blogSchema.findById(blog.get('_id'), function (err, return_blog) {
                should.not.exist(err);
                return_blog.should.be.instanceOf(Blog);
                return_blog.get('_id').should.be.equal(blog.get('_id'));
                done();
            });
        });

        it('test blog schema method sync findById used _id', function () {
            var blog = new Blog();
            blogSchema.saveSync(blog);
            var return_blog = blogSchema.findByIdSync(blog.get('_id'));
            return_blog.should.be.instanceOf(Blog);
            return_blog.get('_id').should.be.equal(blog.get('_id'));
        });

    });

});
/**
 * Created by zhangyang on 5/28/16.
 */
var path=require('path');
var user=require('../server/models/user.model');
var blog=require('../server/models/blog.model');
var category=require('../server/models/category.model');
var collect=require('../server/models/collect.model');
var config=require('../server/util/config');

/* test */

user.find().remove(function(){
   user.create({
       name:'snayan',
       password:'snayan',
       role:'admin'
   },function(){
       console.log('finished populating user.');
   });
});

blog.find().remove(function(){
    blog.create({
        title:'Assert1',
        author:'snayan',
        url:'/articles/md/2016/05/Assert.md',
        tags:['C++','Javascript','Node','Express','Mongodb','Redis','Squeue','C#','Sql Service','VB'],
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert2',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md',
        tags:['中国','美国','印度','日本','韩国','朝鲜','阿富汗','老挝','菲利宾','英国','德国','硬度尼西亚'],
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert3',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md',
        tags:['湖北','湖南','深圳','广州','东莞','武汉','监利',' 分盐','五姓'],
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert4',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md',
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert5',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md'
    },{
        title:'Assert6',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md'
    },{
        title:'Assert7',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md'
    },{
        title:'Assert8',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md'
    },{
        title:'Assert9',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md'
    },{
        title:'Assert10',
        author:'snayan',
        url:'../server/articles/md/2016/05/Assert.md'
    },function(){
        console.log('finished populating blog.');
    });
});

category.find().remove(function(){
    category.create({
        category:'node.js的学习.'
    },{
        category:'javascript的学习.'
    },{
        category:'express的学习.'
    },function(){
        console.log('finished populating category.');
    });
});

collect.find().remove(function(){
   collect.create({
       title:'Node.js API 中文版',
       url:'http://nodeapi.ucdok.com/#/api/',
       tag:['node.js']
   },{
       title:'Git教程-廖雪峰的官网',
       url:'http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/',
       tag:['git']
   },{
       title:'io.js javascript/io',
       url:'https://iojs.org/zh/index.html',
       tag:['io.js','node.js']
   },{
       title:'javascript event loop explained',
       url:'http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/',
       tag:['javascript','event loop']
   },{
       title:'13款惊艳的Node.js框架',
       url:'http://blog.oneapm.com/apm-tech/716.html?utm_source=Community&utm_medium=Article&utm_term=13%20%E6%AC%BE%E6%83%8A%E8%89%B3%E7%9A%84%20Node.js%20%E6%A1%86%E6%9E%B6%E2%80%94%E2%80%94%E7%AC%AC2%E9%83%A8%E5%88%86&utm_content=wk523-529&utm_campaign=AiNodejsArti&from=jsclbbvkxs',
       tag:['Node.js']
   },{
       title:'Redis 命令速查表',
       url:'https://selfstore.io/products/538',
       tag:['Redis']
   },{
       title:'ES6 In Depth Articles',
       url:'https://hacks.mozilla.org/category/es6-in-depth/',
       tag:['ES6']
   },{
       title:'V8 Docs',
       url:'https://v8docs.nodesource.com/',
       tag:['V8','Node.js']
   },{
       title:'javascript中文网',
       url:'http://www.javascriptcn.com/thread-2.html',
       tag:['javascript']
   },{
       title:'InfoQ-促进软件开发领域知识与创新的传播',
       url:'http://www.infoq.com/cn/',
       tag:['InfoQ']
   },{
       title:'ECMAScript 6入门',
       url:'http://es6.ruanyifeng.com/',
       tag:['ES6']
   });
});
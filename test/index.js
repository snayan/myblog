/**
 * Created by zhangyang on 5/28/16.
 */
var user=require('../server/models/user.model');
var blog=require('../server/models/blog.model');
var category=require('../server/models/category.model');

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
        url:'../articles/md/2016/05/Assert.md',
        tags:['C++','Javascript','Node','Express','Mongodb','Redis','Squeue','C#','Sql Service','VB']
    },{
        title:'Assert2',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md',
        tags:['中国','美国','印度','日本','韩国','朝鲜','阿富汗','老挝','菲利宾','英国','德国','硬度尼西亚']
    },{
        title:'Assert3',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md',
        tags:['湖北','湖南','深圳','广州','东莞','武汉','监利',' 分盐','五姓']
    },{
        title:'Assert4',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
    },{
        title:'Assert5',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
    },{
        title:'Assert6',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
    },{
        title:'Assert7',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
    },{
        title:'Assert8',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
    },{
        title:'Assert9',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
    },{
        title:'Assert10',
        author:'snayan',
        url:'../articles/md/2016/05/Assert.md'
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
/**
 * Created by zhangyang on 5/28/16.
 */
var _=require('lodash');
var fs=require('fs');
var path=require('path');
var blogEntity=require('../server/api/blog/blog.entity');
var config=require('../server/util/config');

/* test */

var blogData=[
    {
        title:'Assert1',
        author:'snayan',
        category:'C++学习',
        tags:['C++','Javascript','Node','Express','Mongodb','Redis','Squeue','C#','Sql Service','VB'],
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert2',
        category:'Node学习',
        author:'snayan',
        tags:['中国','美国','印度','日本','韩国','朝鲜','阿富汗','老挝','菲利宾','英国','德国','硬度尼西亚'],
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert3',
        author:'snayan',
        category:'Javascript学习',
        tags:['湖北','湖南','深圳','广州','东莞','武汉','监利',' 分盐','五姓'],
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert4',
        author:'snayan',
        category:'Css学习',
        description:'这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,这个是测试数据,'
    },{
        title:'Assert5',
        author:'snayan',
        category:'C++学习'
    },{
        title:'Assert6',
        author:'snayan',
        category:'Node学习'
    },{
        title:'Assert7',
        author:'snayan',
        category:'Javascript学习'
    },{
        title:'Assert8',
        author:'snayan',
        category:'Css学习'
    },{
        title:'Assert9',
        author:'snayan',
        category:'C++学习'
    },{
        title:'Assert10',
        author:'snayan',
        category:'C++学习'
    }
];

blogData=_.map(blogData,function (data) {
    return new blogEntity(data).toJSON();
});

fs.writeFileSync(path.join(config.datapath,'blog.data.txt'),JSON.stringify(blogData));
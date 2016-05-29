/**
 * Created by zhangyang on 5/28/16.
 */
var user=require('../models/user.model');
var blog=require('../models/blog.model');

/* test */

user.find({}).remove(function(){
   user.create({
       name:'snayan',
       password:'snayan',
       role:'admin'
   },function(){
       console.log('finished populating user.');
   });
});

blog.find({}).remove(function(){
    blog.create({
        title:'Assert',
        author:'snayan',
        url:'../articles/2016/05/Assert.md'
    },function(){
        console.log('finished populating blog.')
    });
});
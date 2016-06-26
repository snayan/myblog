/**
 * Created by zhangyang on 6/18/16.
 */

/* collect model */

define([
    'backbone',
    'global'
],function(Backbone,Global){
    'use strict'
    
    var collect=Backbone.Model.extend({
       
        url:Global.api+'/collect/:id',
        
        defaults:{
            'title':'',
            'url':'',
            'tag':[]
        },
        
        initialize:function(){
            this.url=String.prototype.replace.call(this.url,':id',this.get('id'));
        },
        
        parse:function (res,option) {
            return res;
        }
    });

    return collect;
});
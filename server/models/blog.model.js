/**
 * Created by zhangyang on 5/28/16.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

/* blog model */
var blogShema=new Schema({
    //标题
    title:{
        type:String,
        required:true
    },
    //作者
    author:{
        type:String,
        required:true,
        default:'snayan'
    },
    //md路径
    url:String,
    //简介
    description:String,
    //内容
    body:Buffer,
    //创建时间
    createDate:{
        type:Date,
        default:Date.now
    },
    //修改时间
    updateDate:{
        type:Date,
        default:Date.now
    },
    //是否展示
    show:{
        type:Boolean,
        default:true
    },
    //标签
    tags:[
        String
    ],
    //分类
    category:String,
    //评论
    comments:[
        {
            name:String,
            email:String,
            comment:String,
            date:Date
        }
    ],
    //其他信息:浏览次数,赞的次数
    meta:{
        votes:Number,
        favs:Number
    }
});

blogShema
    .virtual('content')
    .get(function(){
        return this.body.toString('utf8');
    });

if (!blogShema.options.toObject) blogShema.options.toObject = {};
blogShema.options.toObject.transform = function (doc, ret, options) {
    // remove the _id of every document before returning the result
    delete ret.body;
};

module.exports=mongoose.model('blog',blogShema);

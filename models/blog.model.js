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
    //路径
    url:String,
    //内容
    body:String,
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

module.exports=mongoose.model('blog',blogShema);

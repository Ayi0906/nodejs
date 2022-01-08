const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let Schema = mongoose.Schema

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
        // 注意不要写Date.now(),因为会即刻调_time，则mongoose这回调用Date.now()
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/defaultAvatar.jpg'
    },
    bio: {
        type: String,
        defult: ''
        // 保证数据完整性
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
        // -1 是保密
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        // 0：没有权限限制
        // 1：不可以评论
        // 2：不可以登录
        // 是否可以评论，
        // 是否可以登录使用
        enum: [0, 1, 2],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)
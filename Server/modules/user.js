const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://omsharma2772005:5fnZiKx54HzPKrBr@cluster0.e68j8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema  = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profilePic: { type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" },
    bio: {type: String},
    loc: {type: String,},
    web: {type: String,},
    subscriptionPlan: {type: String,},
    followers_count: { type: Number, default: 0 },  
    following_count: { type: Number, default: 0 },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    otp: {
        code: String,
        expiresAt: Date,
      }
}, { timestamps: true });
module.exports = mongoose.model('user',UserSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema
const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0 }
});

//create users model class collection
mongoose.model('users', userSchema);
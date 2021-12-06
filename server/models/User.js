const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema
const userSchema = new Schema({
    googleId: String
});

//create users model class collection
mongoose.model('users', userSchema);
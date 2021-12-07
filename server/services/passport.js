const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

// make use of cookies to keep track of the currently signed in user
// Call serializeUser with the user to generate the identifying piece of info (cookie)
// user.id refers to user id within 'users' collection in db (not profile.id)
passport.serializeUser((user, callback) =>{
    callback(null, user.id);
});

/*Take identifying piece of info from cookie, pass into 'deserializeUser' 
to turn it into a user.
id refers to user id within 'users' collection in db
*/
passport.deserializeUser((id, callback) =>{
    //find id within the user db
    User.findById(id).then(user=> {
        callback(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:"/auth/google/callback",
        proxy: true // tell google to trust heroku proxy server
    }, (accessToken, refreshToken, profile, callback) => {
        
        User.findOne({googleId: profile.id})
          .then((existingUser) => {
            // existingUser reperesents User.findOne({googleId: profile.id}) 
            
            if (existingUser){
                // we already have a record with the given profile ID
                console.log(`user id: ${profile.id} already exist in the db.`);
                // notify passport that we are finished by callback function
                callback(null, existingUser);
            } else {
                // we do not have a user record with this ID, make a new record
                // new User is mongoose model instance (a record)
                new User({googleId: profile.id})
                .save()
                .then((createdUser) => callback(null, createdUser));
            }
          })
    })
);
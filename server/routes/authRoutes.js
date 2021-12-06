const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    );

    // handle callback route
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req,res) => {
        // destroys the session (cookie) that was created by Passport 
        // logout() is a function from passport
        req.logout();
        res.send(req.user);
    })

    app.get('/api/current_user', (req,res) =>{
        res.send(req.user);
    })
}
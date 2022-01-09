const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    );

    // handle callback route
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            // redirect users after users logged in successfully with google
            res.redirect('/surveys');
        }
        );

    app.get('/api/logout', (req,res) => {
        // destroys the session (cookie) that was created by Passport 
        // logout() is a function from passport
        req.logout();
        // redirect users to landing page after logging out
        res.redirect('/');
    })

    app.get('/api/current_user', (req,res) =>{
        res.send(req.user);
    })
}
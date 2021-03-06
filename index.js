const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

// Parse incoming request bodies to json and store in req.body property.
app.use(bodyParser.json());

/* Enable cookies using cookie-session
maxAge -> how long can cookie exist before it expires
         Ex. 30 days * 24 hours* 60 minutes * 60 seconds * 1000 miliseconds
keys -> encryption key for our cookie (can be anything)
*/
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey]
    })
);


// tell passport to make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// google oauth routes
authRoutes(app);
// stripe billing routes
billingRoutes(app);
// survey routes
surveyRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // main.js or main.css file
    // if request is not found in express, look into client/build
    app.use(express.static('client/build'));

    // Express will serve up index.html file 
    // if it does not recognize the requested route
    const path = require('path');
    app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


/* dynamic port binding
listen to port that is provided by third party platform
Ex. Heroku
PORT would listen to 5000 by default if a port is not provided
*/
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send({hi:'Hello World!'})
})

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});




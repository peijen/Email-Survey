const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

    app.post('/api/stripe', requireLogin, async (req, res) =>{
        
        // get request content in body property
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: '5 dollars for 5 credits.',
          });
        
        // access current logged in user model setup by passport init and session
        // increase available credits for users
        req.user.credits += 5;
        const user = await req.user.save();
        // send back the user model to requested user
        res.send(user);
    });
};
const _ = require('lodash');
const url = require('url');
const { Path } = require('path-parser')
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer'); 
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    
    app.get('/api/survey', requireLogin, async (req, res) => {
      // get list of surveys from database excluding recipients for users
      // mongoose select ref: https://mongoosejs.com/docs/api/query.html#query_Query-select
      const surveys = await Survey.find({ _user: req.user.id })
        .select({ recipients: false });

      res.send(surveys);
    })

    app.get('/api/survey/:surveyId/:choice', (req, res)=> {
      res.send("Thanks for voting!");
    });
    
    app.post('/api/survey/webhooks', (req, res) => {
      // api for receiving messages from SendGrid after user responded the survey
      
      // define url pattern
      const p = new Path('/api/survey/:surveyId/:choice');
      // lodash chain ref: https://lodash.com/docs/4.17.15#chain
      const events = _.chain(req.body)
        .map( event =>{
          // extract url route ref: https://www.npmjs.com/package/url
          const pathname = url.parse(event.url, true).pathname;

          //extract surveyId and choice from url  ref: https://www.npmjs.com/package/path-parser
          const match = p.test(pathname);
          if (match){
            // return extracted objects
            return {email: event.email, surveyId: match.surveyId, choice: match.choice};
          }
        })
        .compact()  //remove any falsey values such as undefined, null, etc
        .uniqBy('email','surveyId') // remove duplicates in case the same user voted multiple times
        .each(event =>{
          // match the survey and recipients in mongodb and update survey info with mongo query
          Survey.updateOne({
            _id: event.surveyId,
            recipients: {
              $elemMatch:{ email: event.email, responded: false }
            }
          },
          {
            $inc: { [event.choice]: 1 },  // increment yes or no vote by 1 from users
            $set: { 'recipients.$.responded': true }, // update user responded to true
            lastResponded: new Date()  // update last responded date from users
          }).exec();
        })
        .value();

      res.send({});
    });

    app.post('/api/survey', requireLogin, requireCredits, async (req, res) =>{
      const { title, subject, body, recipients } = req.body;
      
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => 
            { return { email: email }}
        ),
        _user: req.user.id,
        dateSent: Date.now()
      })
      
      // send email
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();
        // update user credits
        req.user.credits -= 1;
        const user = await req.user.save();
        // send back the user model with updated credits
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }

    });
};
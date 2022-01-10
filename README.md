# Email-Survey

Email-Survey is an application which is lets you send surveys (via email) to thousands of people at one time. It allows you to send survey question through email, and tracks each response to the surveys in the dashboard. Email-Survey is a pay-as-you-go service, where one credit can send out one batch of surveys. You can purchase 5 credits for $5.00 inside the application. You can run the application for free by following the trial payment steps below.

## Prerequisite
To run the app in development mode, you will need to acquire the following API keys before you can 
start the app. (You will need to create account for each of the following link)
  - GoogleOAuth keys: [Link to google cloud](https://console.cloud.google.com)
    - Authorized JavaScript origins URI: `http://localhost:5000`
    - Authorized redirect URIs: 
      - `http://localhost:5000/auth/google/callback`
      - `http://localhost:3000/auth/google/callback`
  - MongoDB URI: [Link to Homepage](https://www.mongodb.com/)
  - SendGrid keys: [Link to Homepage](https://sendgrid.com/)
  - Stripe keys: [Link to Homepage](https://dashboard.stripe.com/login)


## Installation
**NOTE:**
When forking the repository, all database/API keys are removed from GitHub for security, so the application will *not* run correctly when running `npm run dev` right away.

1. Git clone this repository: `https://github.com/peijen/Email-Survey.git`
2. Run npm install to install all dependencies.
3. Configure required keys for both server side and client side
    - rename `Email-Survey/config/dev_example.js` to `dev.js`
    - replace with proper api keys
      ```
      module.exports = {
          googleClientID: "Your googleClientID",
          googleClientSecret: "Your googleClientSecret",
          mongoURI: "Your mongo database URI",
          cookieKey: "any random letters",
          stripePublishableKey: "Your stripe Public key",
          stripeSecretKey: "Your stripe secret key",
          sendGridKey:"Your SendGrid key",
          redirectDomain: "http://localhost:3000",
      }
      ```
     - replace with proper api keys in `Email-Survey/client/.env.development`
          ```
          REACT_APP_STRIPE_PUB_KEY=Your_Stripe_Public_Key
          ```

4. Setup [ngrok](https://ngrok.com/) for passing incoming webhook data to localhost
    - You will need to create an account for ngrok. (Feel free to use other tools)
    - follow the setup & installation on ngrok 
    - run `ngrok.exe http 5000` on a separate terminal and keep it on.

5. Setup SendGrid event webhook
    - Settings -> Mail Settings -> Enable Event Webhook
    - Enter `ngrok url` with webhook api to HTTP Post URL
      - example: `https://xxxx-xxx-xxx-xxx-xxx.ngrok.io/api/survey/webhooks`
    - Engagement data -> check the `Clicked` box only and save

6. navigate into the server or `root` directory, and run `npm run dev`, to start both the client, and the express server concurrently.

## Usage
click [this](https://email-surveyer.herokuapp.com/) link to access the application that is hosted on heroku.

### Log in
login with your Google account. This is done securely and externally via Passport's Google OAuth 2.0. 

### Add Credits
To be able to send surveys, you must purchase credits at a cost of $5.00 per 5 credits. To access the purchase screen, you need to click the green "ADD CREDITS" button in the navigation bar. To "purchase" free credits for testing/usage of the application. you will need to insert your email address, and insert "4242 4242 4242 4242" as the credit card number, along with any valid expiry date and security number. Once you click "Pay $5.00", you should be redirected to the dashboard, with 5 credits appearing in the navigation bar, within a few seconds. These credits can be used to send 5 surveys (1 per survey).

### Create and send survey
To send surveys, click the circular red "+" button in the bottom right of the page. This will redirect you to the Survey Form page, where you can insert all of the relevant data you wish to add to your surveys. You can only ask Yes/No question for your email content, such as "Do you like your service?". You need to add all of the recipients in the "Recipients Lists" by inputting comma separated values. Once you are finished with all of the values, you can click the green "Next" button to go to the review page. Double check all fields here, click the green "Send Survey" button to send the survey to all recipients.

### Survey Feedback
When the survey recipient responds to your email, then the dashboard will visually update with these responses. (number of Yes or No will show on your survey on the dashboard)


## Technologies

### Front-End

- Axios
- Create-React-App
- React 17
- Redux
- Redux Form
- Redux Thunk
- MaterializeCss

### Back-End

- Body Parser
- Concurrently
- Cookie-Session
- Express (Node.JS)
- Lodash
- Mongoose
- Nodemon
- Passport (Google OAuth 2.0)
- Path Parser
- SendGrid
- Stripe

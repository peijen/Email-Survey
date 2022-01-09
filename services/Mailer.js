// SendGrid ref: https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail
const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
 
class Mailer {
  constructor({ subject, recipients }, surveyContent) {
    sgMail.setApiKey(keys.sendGridKey);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: "lpo23561023@gmail.com",
      subject: subject,
      html: surveyContent,
      trackingSettings: { enable_text: true, enabled: true }
    };
  }
  
  // Limitation: https://docs.sendgrid.com/api-reference/mail-send/limitations
  async send() {
    const response = await sgMail.send(this.msg);
    return response;
  }
}
 
module.exports = Mailer;
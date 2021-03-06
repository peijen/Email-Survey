const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipientSchema = require('./Recipient');


// create survey schema
const surveySchema = new Schema ({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
})

//create surveys model class collection
mongoose.model('surveys', surveySchema);
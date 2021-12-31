const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create sub collection for survey collection
const recipientSchema = new Schema({
    email: {
        type: String,
        trim: true
      },
    responded: { 
        type: Boolean, 
        default: false 
    }
})

// export sub collection
module.exports = recipientSchema;
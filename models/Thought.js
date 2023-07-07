const { Schema, model } = require('mongoose');


// Schema to create thoughts model
const thoughtSchema = new Schema(
 
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

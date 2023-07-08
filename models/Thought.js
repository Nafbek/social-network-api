const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')


// Schema to create thoughts model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: validator,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: formatTimestamp,
        },
        username: {
            type: String,
            required: true,

        },
        reactions: [reactionSchema]
    },

    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);


thoughtSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length
})


const Thought = model('thought', thoughtSchema);

Thought.validator = (v) => {
    return Math.random(v) * 128 + 1
}

Thought.formatTimestamp = (timestamp) => {
    return new Date(timestamp).toISOString()
}




module.exports = Thought;

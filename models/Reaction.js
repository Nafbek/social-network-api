const { Schema, Types, model } = require('mongoose');

// Create reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            formatTimestamp: (timestamp) => {                    //
                return new Date(timestamp).toISOString()
            },
        }
    },
    {
         toJSON: {
            getters: true,

    },
    id:false,
    }
   
  
);




module.exports = reactionSchema;

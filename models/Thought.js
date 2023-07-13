const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.length <= 128;
        },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      formatTimestamp: (timestamp) => {
        return new Date(timestamp).toISOString();
      }
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);


thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);



module.exports = Thought;

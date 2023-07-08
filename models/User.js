const { Schema, Types } = require('mongoose');
const Thought = require('./Thought')


// Schema to create user model
const userSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: {
                validator: (v)=> {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
                    // '$jsonSchema': { pattern: '@gmail.com' },
                    // $match: '@gmail.com'

                }
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User;

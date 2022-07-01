const mongoose = require('mongoose');

const user = mongoose.model(
    'Users',
    mongoose.Schema({
        noms: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        genre: {
            type: String,

        },
        shortDescription: {
            type: String
        }
    },
        {
            transform: {
                toJSON: function (doc, ret) {
                    ret.userId = ret._id;
                    delete ret._id;
                    delete ret.__v;
                }
            }
        },
        {
            timestamps: true
        }
    )
)
module.exports = {
    user
}
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    test: {
        type: String,
        required: [false, "test"]
    }
},
{
    timestamps: true,
    collection: 'Tulu Users Database'
})

module.exports = mongoose.model("User", userSchema)
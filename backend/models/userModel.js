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
    role: {
        type: String,
        enum: ["admin", "dealer", "tulu", "user"],
        default: "user"
    }
},
{
    timestamps: true,
    collection: 'Tulu Users Database'
})

module.exports = mongoose.model("User", userSchema)
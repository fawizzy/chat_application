const database = require("../db/mongoose");

const userSchema = database.schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    is_online: {
        type: Boolean,
        default: true
    }
},
{timestamps: true});

const userModel = database.model("user", userSchema)

module.exports = userModel
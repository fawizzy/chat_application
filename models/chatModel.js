const mongoose = require("mongoose")
const database = require("../db/mongoose");

const chatSchema = database.schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    
},
{timestamps: true}
);

const chatModel = database.model("chats", chatSchema)

module.exports = chatModel
const chatModel = require("../models/chatModel");


async function addMessage(chatData){
    const requiredFields = [
        "sender_id",
        "receiver_id",
        "message"
    ];

    for (const field of requiredFields) {
        if (!chatData[field]) {
            console.log({ error: `Missing ${field}` });
            return;
        }
    }
    let message = new chatModel(chatData)

    message.save()
    .then(
        console.log("message inserted")
    )
}

const chatController = {
    addMessage
}

module.exports = chatController
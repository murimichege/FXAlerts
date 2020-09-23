const { response } = require('express');

// Set your app credentials
const credentials = {
    apiKey: 'a61865ed25eae2bcbf8b8701e30878556caf71fe955ee93a2eac05a93556a5b1',
    username: 'EddieChege',
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

function sendMessage() {
    const options = {
        // Set the numbers you want to send to in international format
        to: '+254701684754',
        // Set your message
        message: "I'm a lumberjack and its ok, I sleep all night and I work all day",
        // Set your shortCode or senderId
       // from: 'XXYYZZ'
    }

    // That’s it, hit send and we’ll take care of the rest
    sms.send(options)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        });
}

sendMessage();
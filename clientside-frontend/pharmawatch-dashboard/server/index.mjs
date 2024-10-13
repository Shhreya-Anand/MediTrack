import dotenv from "dotenv";
// require("dotenv").config()
import twilio from 'twilio';

dotenv.config({
  path: "../.env",
});

// ignore error 

const accountSid = process.env.ACCOUNTSID;  
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "test notification message",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+14134726195",
  });

  console.log(message.body);
}

createMessage();
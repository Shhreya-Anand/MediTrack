
import dotenv from "dotenv";
//require("dotenv").config()
import twilio from 'twilio';
const { strict } = require("assert");
const express = require("express");
const { writeFile, readFile, write } = require("fs");
var mongoose = require("mongoose");
const app = express();
const {MongoClient, ObjectId, Db} = require("mongodb")
const {spawn} = require("child_process");
const { time } = require("console");
const exp = require("constants");
const bodyParser = require("body-parser")

dotenv.config({
  path: "../.env",
});

// ignore error 

const accountSid = process.env.ACCOUNTSID;  
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "this is Adam",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+14134726195",
  });

  console.log(message.body);
}

createMessage();

function CheckTimes(){
  var date = new Date();
  let _currentTime = date.toTimeString()
  currentTime = _currentTime.split(":")
  finalCurrentTime = currentTime[0] + currentTime[1]

  console.log(finalCurrentTime)
}


import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define embedded schemas directly
const personalDetailsSchema = new Schema({
    "firstname": String,
    "lastname": String,
    "phoneNumber": String,
    "branch": String,
    "dateOfBirth": Date,
}, { _id: false }); // _id: false prevents auto-adding _id to subdocuments

const userBadgesSchema = new Schema({
    "badgeKey": Number,
    "awardedAt": String,
}, { _id: false });

// Main users schema with embedded documents
const users_Mongoose = new Schema({
    "userkey": Number,
    "username": String,
    "email": String,
    "password": String,
    "personalDetails": [personalDetailsSchema], // Embedded document array
    "userBadges": [userBadgesSchema], // Embedded document array
}, { collection: "users" });

export default mongoose.models.users_Mongoose || mongoose.model("users_Mongoose", users_Mongoose);
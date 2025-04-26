import mongoose from "mongoose";
const Schema = mongoose.Schema;

const personalDetailsSchema = new Schema({
    "firstname": String,
    "lastname": String,
    "phoneNumber": String,
    "branch": String,
    "dateOfBirth": Date,
    "cgpa": Number,
    "gender": String
}, { _id: false });

const userBadgesSchema = new Schema({
    "badgeKey": Number,
    "awardedAt": String,
}, { _id: false });

const users_Mongoose = new Schema({
    "userkey": Number,
    "username": String,
    "email": String,
    "password": String,
    "personalDetails": [personalDetailsSchema],
    "userBadges": [userBadgesSchema],
}, { collection: "users" });

export default mongoose.models.users_Mongoose || mongoose.model("users_Mongoose", users_Mongoose);
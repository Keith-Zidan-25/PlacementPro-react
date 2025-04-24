import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define embedded schemas directly
const courseAssessmentSchema = new Schema({
    "quizKey": Number,
}, { _id: false });

const courseModuleSchema = new Schema({
    "title": String,
    "moduleFile": String,
}, { _id: false });

const courses_Mongoose = new Schema({
    "courseKey": Number,
    "title": String,
    "courseDescription": String,
    "credits": Number,
    "courseImage": String,
    "cId": String,
    "imagePath": String,
    "courseAssessments": [courseAssessmentSchema],
    "courseModules": [courseModuleSchema],
}, { collection: "courses" });

export default mongoose.models.courses_Mongoose || mongoose.model("courses_Mongoose", courses_Mongoose);
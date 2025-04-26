import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

export const courseComplete = new Schema({
    "userkey": Number,
    "courseKey": Number,
    "dateOfCompletion": String,
}, { collection: "completedCourses" })

export default mongoose.models.courseComplete || model("courseCompleted", courseComplete);
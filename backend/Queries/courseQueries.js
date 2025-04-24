import courses_Mongoose from "../models/courses_Mongoose.js";

class CourseQueries {
    constructor() {}
    
    async getCourseModules(courseCode) {
        try {
            const result = await courses_Mongoose.findOne(
                { cId: courseCode },
                {
                    courseKey: 1,
                    title: 1,
                    courseDescription: 1,
                    courseModules: 1,
                    courseAssessments: 1
                }
            );
            
            return result || null;
        } catch (err) {
            console.error("MongoDB getCourseModules error:", err);
            throw err;
        }
    }
    
    async getAllCourses() {
        try {
            return await courses_Mongoose.find({}, {
                courseKey: 1,
                title: 1,
                courseDescription: 1,
                credits: 1,
                courseImage: 1,
                cId: 1
            });
        } catch (err) {
            console.error("MongoDB getAllCourses error:", err);
            throw err;
        }
    }
    
    async getCourseById(courseId) {
        try {
            return await courses_Mongoose.findOne({ cId: courseId });
        } catch (err) {
            console.error("MongoDB getCourseById error:", err);
            throw err;
        }
    }
}

const courseDB = new CourseQueries();
export default courseDB;
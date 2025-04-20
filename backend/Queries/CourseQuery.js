const db = require('../database');

class CourseQueries{
    constructor() {};

    async getCourseModules(courseCode) {
        let query = `SELECT c.COURSE_KEY, c.TITLE AS COURSE_TITLE, c.COURSE_DESCRIPTION, m.TITLE AS MODULE_TITLE, m.MODULE_FILE FROM COURSES c
                        JOIN COURSE_MODULES m ON c.COURSE_KEY = m.COURSE_KEY WHERE c.C_ID = ?;`
        return db.queryDB(query, [courseCode])
    }
}

const courseDB = new CourseQueries();
module.exports = courseDB
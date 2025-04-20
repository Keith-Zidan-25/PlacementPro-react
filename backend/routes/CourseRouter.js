const express = require('express');
const courseDB = require('../Queries/CourseQuery');
const courseRouter = express.Router();

courseRouter.get('/modules/:courseCode', async (req, res) => {
    const { courseCode } = req.params;

    try {
        const courseData = await courseDB.getCourseModules(courseCode);

        res.status(200).json({ data: courseData, success: true });
    } catch(err) {
        console.error(err)
        res.status(500).json({success: false, msg: 'Unknown server error'});
    }
});

module.exports = courseRouter
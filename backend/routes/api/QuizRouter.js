const express = require('express');
const quizdb = require('../../Queries/QuizQuery');
const quizRouter = express.Router();

quizRouter.get('/user-answers/:quizkey', async (req, res) => {
    const { quizkey } = req.params;

    // const questions = await 
});

module.exports = quizRouter
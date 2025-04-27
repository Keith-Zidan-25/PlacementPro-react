const express = require('express');
const quizdb = require('../../Queries/quizQueries');
const quizRouter = express.Router();

// quizRouter.get('/user-answers/:quizkey', async (req, res) => {
//     const { quizkey } = req.params;

//     try {

//     } catch (err) {
//         console.error(err);
//     }
// });

// quizRouter.get('/details/:quizkey', async (req, res) => {
//     const { quizkey } = req.params;

//     try {
//         const quizKey = Number(quizkey);
//         const details = await quizdb.default.g
//     } catch (err) {
//         console.error(err);
//     }
// });

quizRouter.get('/questions/:quizkey', async (req, res) => {
    const {quizkey} = req.params;

    try {
        const quizKey = Number(quizkey);
        const questionAmount = await quizdb.default.getNoOfQuestionsInQuiz(quizKey);
        const questions = await quizdb.default.getQuizQuestions(quizKey, questionAmount);

        if (!result) {
            return res.status(404).json({ success: false, msg: "Questions not found"});
        }
        res.status(200).json({ success: true, questions: questions})
    } catch (err) {
        console.error(err);
    }
});

quizRouter.post('/submit', async (req, res) => {
    const body = req.body;

    try {
        const result = await quizdb.default.insertQuizResults(body);

        if (!result) {
            return res.status(400).json({ success: false, msg: 'Could not save your quiz results'});
        }
        res.status(201).json({ success: true, msg: "Successfully saved your quiz attempt"});
    } catch (err) {
        console.error(err);
    }
});

module.exports = quizRouter
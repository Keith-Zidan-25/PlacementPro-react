import quiz_Mongoose from '../models/quiz_Mongoose.js';
import solvedQuizzes_Mongoose from '../models/solvedQuizzes_Mongoose.js';
import questions_Mongoose from '../models/questions_Mongoose.js';

class QuizQueries {
    constructor() {}

    async getQuizzes() {
        return await quiz_Mongoose.find({});
    }

    async getQuizTimeLimit(quizKey) {
        const quiz = await quiz_Mongoose.findOne({ quizKey }, 'timeLimit');
        return quiz || null;
    }

    async getQuizzesGivenByUser(userKey) {
        return await solvedQuizzes_Mongoose.find({ userKey })
            .populate({ path: 'quizKey', select: 'title' });
    }

    async getNoOfQuestionsInQuiz(quizKey) {
        const quiz = await quiz_Mongoose.findOne({ quizKey }, 'questionAmount');
        return quiz || null;
    }

    async getQuizQuestions(quizKey, limit) {
        try {
            const questions = await questions_Mongoose.aggregate([
                { $match: { quizKey: quizKey } },
                { $sample: { size: limit } }, 
                {
                    $project: {
                        _id: 0,
                        questionKey: 1,
                        question: 1,
                        optionA: 1,
                        optionB: 1,
                        optionC: 1,
                        optionD: 1
                    }
                }
            ]);

            return questions;
        } catch (err) {
            console.error("Error fetching quiz questions:", err);
            throw err;
        }
    }

    async getQuizQuestionAnswers(quizKey) {
        return await Question.find({ quizKey }, 'questionKey answer');
    }

    async getUserQuizStats(userKey) {
        const stats = await solvedQuizzes_Mongoose.aggregate([
            { $match: { userKey } },
            {
                $group: {
                    _id: null,
                    totalQuizzes: { $sum: 1 },
                    averageScore: { $avg: '$score' }
                }
            }
        ]);
        return stats[0] || { totalQuizzes: 0, averageScore: 0 };
    }

    async insertQuizResults(userKey, quizKey, score, userAnswers) {
        return await solvedQuizzes_Mongoose.findOneAndUpdate(
            { userKey, quizKey },
            { $set: { score, wrongAnswerList: userAnswers, dateOfSol: new Date() } },
            { upsert: true, new: true }
        );
    }
}
const quizObject = new QuizQueries()
export default quizObject;

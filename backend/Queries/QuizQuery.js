const db = require('../database');

class QuizQueries {
    constructor() {};

    //GET Functions
    async getQuizzes() {
        let query = `
            SELECT Q.QUIZKEY, Q.TITLE, Q.INFO, Q.DIFFICULTY, QI.IMAGE_URL, QC.CATEGORY, QC.SUB_CATEGORY, QCO.COMPANY_NAME 
            FROM QUIZ AS Q LEFT JOIN QUIZ_IMAGE AS QI ON Q.QUIZKEY = QI.QUIZKEY
            LEFT JOIN QUIZ_CATEGORY AS QC ON Q.QUIZKEY = QC.QUIZKEY 
            LEFT JOIN QUIZ_COMPANY AS QCO ON Q.QUIZKEY = QCO.QUIZKEY;
        `;
        return db.queryDB(query);
    }

    async getQuizTimeLimit(quizKey) {
        let query = "SELECT TIMELIMIT FROM QUIZ WHERE QUIZKEY = ?;";
        return db.queryDB(query, [quizKey], true);
    }

    async getQuizzesGivenByUser(userKey) {
        let query = `
            SELECT SQ.QUIZKEY, Q.TITLE, QI.IMAGE_URL, SQ.SCORE FROM PLACEMENTPRO2.QUIZ AS Q 
            LEFT JOIN PLACEMENTPRO2.QUIZ_IMAGE AS QI ON Q.QUIZKEY = QI.QUIZKEY
            LEFT JOIN PLACEMENTPRO2.solved_quizzes AS SQ ON Q.QUIZKEY = SQ.QUIZKEY WHERE SQ.USERKEY = ?;
        `;
        return db.queryDB(query, [userKey]);
    }

    async getNoOfQuestionsInQuiz(quizKey) {
        let query = "SELECT Q_AMT FROM QUIZ WHERE QUIZKEY = ?;";
        return db.queryDB(query, [quizKey], true);
    }

    async getQuizQuestions(quizKey, noOfQuestions) {
        let query = `
            SELECT Q.QUESTION_KEY, Q.QUESTION, Q.OPTION_A, Q.OPTION_B, Q.OPTION_C, Q.OPTION_D, QI.IMAGE_URL FROM QUESTIONS 
            Q LEFT JOIN QUESTION_IMAGE AS QI ON Q.QUESTION_KEY = QI.QUESTION_KEY WHERE Q.QUIZKEY = ? ORDER BY RAND() LIMIT ?;
        `;
        return db.queryDB(query, [quizKey, noOfQuestions]);
    }

    async getQuizQuestionAnswers(quizKey) {
        let query = "SELECT QUESTION_KEY, ANSWER FROM QUESTIONS WHERE QUIZKEY = ?;";
        return db.queryDB(query, [quizKey]);
    }

    async getUserQuizStats(userKey) {
        let query = `
            SELECT COUNT(*) AS totalQuizzes, AVG(SCORE) AS averageScore 
            FROM SOLVED_QUIZZES WHERE USERKEY = ?;
        `;
        return db.queryDB(query, [userKey], true);
    }
    
    //INSERT Functions
    async insertQuizResults(userKey, quizKey, score, userAnswers) {
        let query = `
            INSERT INTO SOLVED_QUIZZES(USERKEY, QUIZKEY, SCORE, USER_ANSWER_LIST) VALUES (?,?,?,?) 
            ON DUPLICATE KEY UPDATE SCORE = VALUES(SCORE), DATE_OF_SOL = CURRENT_TIMESTAMP, USER_ANSWER_LIST = VALUES(USER_ANSWER_LIST);
        `;
        return db.queryDB(query, [userKey, quizKey, score, userAnswers]);
    };
}

const quizQueries = new QuizQueries();
module.exports = quizQueries
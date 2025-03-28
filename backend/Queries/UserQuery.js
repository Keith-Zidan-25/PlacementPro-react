const db = require('../database');

class UserQueries {
    constructor() {};

    //GET Functions
    async getUserData(username) {
        let query = "SELECT USERKEY, USERNAME, PASSWORD, EMAIL FROM USERS WHERE USERNAME = ?;";
        return db.queryDB(query, [username], true);
    };

    async getUserKey(userName) {
        let query = "SELECT USERKEY FROM USERS WHERE USERNAME = ?;";
        return db.queryDB(query, [userName], true);
    };

    async getAllBadges() {
        let query = "SELECT badge_key, badge_name, required_quizzes, required_score, image_url FROM badges;";
        return db.queryDB(query);
    };

    async getUserBadges(userKey) {
        let query = `
            SELECT b.badge_name, b.image_url, ub.awarded_at
            FROM user_badges ub
            JOIN badges b ON ub.badge_key = b.badge_key
            WHERE ub.userkey = ?;
        `;
        return db.queryDB(query, [userKey]);
    };

    //INSERT Functions
    async insertNewUserData(userName, password, email) {
        let query = "INSERT INTO USERS(USERNAME, PASSWORD, EMAIL) VALUES (?,?,?);";
        return db.queryDB(query, [userName, password, email]);
    };

    async awardUserBadge(userKey, badgeKey) {
        let query = "INSERT INTO user_badges (userkey, badge_key) VALUES (?, ?);";
        return db.queryDB(query, [userKey, badgeKey]);
    };

    //Validation Functions Functions
    async checkUserBadge(userKey, badgeKey) {
        let query = "SELECT * FROM user_badges WHERE userkey = ? AND badge_key = ?;";
        return db.queryDB(query, [userKey, badgeKey], true);
    };

    async checkIfEmailExists(email) {
        let query = "SELECT * FROM USERS WHERE EMAIL = ?;"
        return db.queryDB(query, [email], true);
    };
}

const userQueries = new UserQueries();
module.exports = userQueries
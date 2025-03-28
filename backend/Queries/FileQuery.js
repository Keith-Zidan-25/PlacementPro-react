const db = require('../database');

class FileQueries {
    constructor() {};

    async getImages(attributeID, attribute, attributeKey) {
        let query = `SELECT IMAGE FROM ${attribute} WHERE ${attributeID} = ?;`;
        return db.queryDB(query, [attributeKey]);
    };
}

const fileQueries = new FileQueries();
module.exports = fileQueries
const db = require('../database');

class FileQueries {
    constructor() {};

    async getImages(attributeID, attribute, attributeKey) {
        let query = `SELECT IMAGE FROM ${attribute} WHERE ${attributeID} = ?;`;
        return db.queryDB(query, [attributeKey]);
    }

    async getResumeTemplates() {
        let query = 'SELECT TITLE, TEMPLATE_DESC, IMAGE_PATH FROM RESUME_TEMPLATE';
        return db.queryDB(query);
    }
    
    async getTemplateDetails(templateName) {
        let query = 'SELECT FILENAME, FILEPATH FROM RESUME_TEMPLATE WHERE TITLE = ?';
        return db.queryDB(query, [templateName], true);
    }
}

const fileQueries = new FileQueries();
module.exports = fileQueries
import resumeTemplate_Mongoose from "../models/resumeTemplate_Mongoose.js";

class FileQueries {
    constructor() {}

    async getResumeTemplates() {
        try {
            const templates = await resumeTemplate_Mongoose.find({}, 'title templateDesc imagePath');
            return templates;
        } catch (err) {
            throw new Error('Error fetching resume templates: ' + err.message);
        }
    }

    async getTemplateDetails(templateName) {
        try {
            const template = await resumeTemplate_Mongoose.findOne({ title: templateName }, 'filename filepath');
            return template;
        } catch (err) {
            throw new Error('Error fetching template details: ' + err.message);
        }
    }
}

export default new FileQueries();
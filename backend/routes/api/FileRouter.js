const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const dbUser = require('../../Queries/UserQuery');
const dbFile = require('../../Queries/FileQuery');
const fileRouter = express.Router();

const TEMPLATE_DIR = './resumes/templates';

fileRouter.get('/resumes', async (req, res) => {
    try {
        const resumes = await dbFile.getResumeTemplates();
        res.status(200).json({ resumes: resumes});
    } catch (error) {
        console.error(error);
        res.status(500).json({ errMsg: 'Unknown server error'});
    }
});

// fileRouter.get('/resumes/template/:title', async (req, res) => {
//     const { resumeTitle } = req.params

//     try {
//         const template = await dbFile.getTemplateDetails(resumeTitle);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ errMsg: 'Unknown server error'});
//     }
// });

fileRouter.post('/resume/preview-resume', async (req, res) => {
    const { template, data } = req.body;
    const filePath = path.join(TEMPLATE_DIR, template);

    try {
        const html = await ejs.renderFile(filePath, data);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Rendering error' });    
    }
});

fileRouter.post('/resume/generate-resume', async (req, res) => {
    const { template, data } = req.body;
    const templatePath = path.join(TEMPLATE_DIR, template);
    try {
        const html = await ejs.renderFile(templatePath, data);
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ error: 'PDF Error', details: err.message });
    }
});

// fileRouter.get('/resumes/:username', async (req, res) => {
//     const { username } = req.params;
//     const userKey = await dbUser.getUserKey(username);

//     if (!req.session.user || req.session.user !== userKey.USERKEY) {
//         return res.status(403).json({error: 'Unauthorized access' });
//     }

//     try {
//         const resumeData = await dbFile.getResumes(userKey);

//         res.status(200).json({ userResumes: resumeData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Some Error Occurred' });
//     }
// });

// fileRouter.post('/resumes/save-resume', async (req, res) => {
//     const { userKey, fileType, filename, file } = req.body

//     try {

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Some Error Occurred' });
//     }
// });

module.exports = fileRouter
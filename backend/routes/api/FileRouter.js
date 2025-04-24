const ejs = require('ejs');
const puppeteer = require('puppeteer');
const path = require('path');
const express = require('express');
const dbFile = require('../../Queries/fileQueries');
const fileRouter = express.Router();

const TEMPLATE_DIR = './resumes/templates';

fileRouter.get('/resumes', async (req, res) => {
    try {
        const resumes = await dbFile.default.getResumeTemplates();
        res.status(200).json({ resumes: resumes});
    } catch (error) {
        console.error(error);
        res.status(500).json({ errMsg: 'Unknown server error'});
    }
});

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

module.exports = fileRouter
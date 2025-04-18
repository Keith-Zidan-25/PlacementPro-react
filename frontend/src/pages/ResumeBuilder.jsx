import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeForm from '../components/ResumeForm';
import { templateRegistry, templateEmptyFormRegistry } from '../utils/TemplateResgistry';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Components';

export default function ResumeBuilder() {
    let { title } = useParams()

    const emptyForm = templateEmptyFormRegistry[title + '.ejs'];

    const [templateKey, setTemplateKey] = useState(title + '.ejs');
    const [formData, setFormData] = useState(emptyForm);
    const [previewHtml, setPreviewHtml] = useState('');

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const res = await axios.post('http://localhost:3020/api/file/resume/preview-resume', {
                    template: templateKey,
                    data: formData,
                });
                setPreviewHtml(res.data);
            } catch (err) {
                console.error('Preview Error:', err);
            }
        };
        fetchPreview();
    }, [formData]);
  
    const handleDownload = async () => {
        const res = await axios.post('http://localhost:3020/api/file/resume/generate-resume', {
            template: templateKey,
            data: formData
        }, { responseType: 'blob' });
        const url = URL.createObjectURL(res.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        a.click();
    };
  
    const fields = templateRegistry[templateKey].fields;
    const stepGroup = templateRegistry[templateKey].stepGroups
  
    return (
        <div className="grid grid-cols-2 gap-4 ml-2 mr-2">
            <div className="p-4 border-r">
                <ResumeForm fields={fields} formData={formData} setFormData={setFormData} stepGroups={stepGroup} handleDownload={handleDownload}/>
            </div>
            <div className="p-4">
                <iframe srcDoc={previewHtml} className="w-full h-[80vh] border rounded"></iframe>
            </div>
        </div>
    );
}
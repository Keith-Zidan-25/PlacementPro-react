export const templateRegistry = {
    'Classic Simplistic.ejs': {
        label: 'Classic Resume',
        fields: {
            name: { type: 'text', label: 'Full Name' },
            contact: { type: 'text', label: 'Contact Info' },
            summary: { type: 'textarea', label: 'Summary' },
            workExperience: {
                type: 'array', label: 'Work Experience', fields: {
                    title: { type: 'text', label: 'Job Title' },
                    date: { type: 'text', label: 'Duration' },
                    desc: { type: 'list', label: 'Details' }
                }
            },
            skills: { type: 'list', label: 'Skills' },
            education: {
                type: 'array', label: 'Education', fields: {
                    title: { type: 'text' },
                    date: { type: 'text' }
                }
            },
            achievements: { type: 'list', label: 'Achievements' }
        }
    },
};

export const templateEmptyFormRegistry = {
    'Classic Simplistic.ejs': {
        name: "",
        contact: "",
        summary: "",
        workExperience: [
            {
                title: "",
                date: "",
                desc: []
            },
        ],
        projects: [],
        skills: [],
        education: [
            { title: "", date: "" },
        ],
        achievements: []
    },
};
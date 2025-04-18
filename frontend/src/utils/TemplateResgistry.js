export const templateRegistry = {
    'Classic Simplistic.ejs': {
        label: 'Classic Resume',
        fields: {
            name: { type: 'text', label: 'Full Name' },
            contact: { 
                type: 'object', label: 'Contact Info', fields: {
                    phone: { type: 'text', label: 'Mobile No.' },
                    email: { type: 'email', label: 'Email' },
                    website: { type: 'text', label: 'Any website profile' }
                }
            },
            summary: { type: 'textarea', label: 'Summary' },
            workExperience: {
                type: 'array', label: 'Work Experience', fields: {
                    title: { type: 'text', label: 'Job Title' },
                    date: { type: 'text', label: 'Duration' },
                    desc: { type: 'list', label: 'Details' }
                }
            },
            skills: { type: 'list', label: 'Skills' },
            projects: {
                type: 'array', label: 'Project', fields: {
                    title: { type: 'text', label: 'Project Title'},
                    date: { type: 'text', label: 'Duration' },
                    desc: { type: 'list', label: 'Details' }
                }
            },
            education: {
                type: 'array', label: 'Education', fields: {
                    title: { type: 'text' },
                    date: { type: 'text' }
                }
            },
            achievements: { type: 'list', label: 'Achievements' }
        },
        stepGroups: [
            ['name', 'contact', 'summary'],
            ['workExperience'],
            ['projects'],
            ['skills', 'education'],
            ['achievements']
        ]        
    },
};

export const templateEmptyFormRegistry = {
    'Classic Simplistic.ejs': {
        name: "",
        contact: {
            phone: null,
            email: null,
            website: null,
        },
        summary: "",
        workExperience: [
            {
                title: "",
                date: "",
                desc: []
            },
        ],
        projects: [
            { title: "", date: "", desc: []}
        ],
        skills: [],
        education: [
            { title: "", date: "" },
        ],
        achievements: []
    },
};
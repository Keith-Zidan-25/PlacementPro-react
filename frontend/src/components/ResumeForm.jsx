import React from 'react';

export default function ResumeForm({ fields, formData, setFormData }) {
    const updateField = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const renderField = (key, field) => {
        if (field.type === 'text') return (
            <input className="border p-2 w-full" type="text" placeholder={field.label} value={formData[key] || ''} onChange={e => updateField(key, e.target.value)} />
        );

        if (field.type === 'textarea') return (
            <textarea className="border p-2 w-full" placeholder={field.label} value={formData[key] || ''} onChange={e => updateField(key, e.target.value)} />
        );

        if (field.type === 'list') {
            const items = formData[key] || [];
            return (
                <div>
                    <label>{field.label}</label>
                    {items.map((item, i) => (
                        <input key={i} className="border p-1 w-full" value={item} onChange={e => {
                            const updated = [...items];
                            updated[i] = e.target.value;
                            updateField(key, updated);
                            }} />
                    ))}
                    <button type="button" onClick={() => updateField(key, [...items, ''])}>+ Add</button>
                </div>
            );
        }

        if (field.type === 'array') {
            const arr = formData[key] || [];
            return (
                <div>
                    <label>{field.label}</label>
                    {arr.map((entry, idx) => (
                        <div key={idx} className="border p-2">
                            {Object.entries(field.fields).map(([k, f]) => (
                                <input key={k} className="border p-1 w-full" placeholder={f.label || k} value={entry[k] || ''}
                                    onChange={e => {
                                        const copy = [...arr];
                                        copy[idx] = { ...copy[idx], [k]: e.target.value };
                                        updateField(key, copy);
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                    <button type="button" onClick={() => updateField(key, [...arr, {}])}>+ Add Entry</button>
                </div>
            );
        }
        return null;
    };

    return (
        <form className="space-y-4">
            {Object.entries(fields).map(([key, field]) => (
                <div key={key}>{renderField(key, field)}</div>
            ))}
        </form>
    );
}
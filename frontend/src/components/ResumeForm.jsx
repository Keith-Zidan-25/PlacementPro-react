import React, { useState } from "react";
import { Button, Input, TextArea } from "./Components";

export default function MultiStepResumeForm({ fields, formData, setFormData, stepGroups, handleDownload }) {
    const [step, setStep] = useState(0);

    const updateField = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const renderField = (key, field) => {
        const value = formData[key];

        if (field.type === "text" || field.type === "email") {
            return (
                <div key={key} className="my-2">
                    <label className="font-semibold">{field.label}</label>
                    <Input
                        type={field.type}
                        placeholder={field.label}
                        value={value || ""}
                        onChange={(e) => updateField(key, e.target.value)}
                    />
                </div>
            );
        }

        if (field.type === "textarea") {
            return (
                <div key={key} className="my-2">
                    <label className="font-semibold">{field.label}</label>
                    <TextArea
                        placeholder={field.label}
                        value={value || ""}
                        onChange={(e) => updateField(key, e.target.value)}
                    />
                </div>
            );
        }

        if (field.type === "list") {
            return (
                <div key={key} className="my-2">
                    <label className="font-semibold">{field.label}</label>
                    {(value || []).map((item, i) => (
                        <Input
                            key={i}
                            placeholder={`${field.label} ${i + 1}`}
                            value={item}
                            onChange={(e) => {
                                const updated = [...value];
                                updated[i] = e.target.value;
                                updateField(key, updated);
                            }}
                        />
                    ))}
                    <br></br>
                    <Button type="Button" onClick={() => updateField(key, [...(value || []), ""])}> + Add</Button>
                </div>
            );
        }

        if (field.type === "array") {
            return (
                <div key={key} className="my-2">
                    <label className="font-semibold">{field.label}</label>
                    {(value || []).map((entry, idx) => (
                        <div key={idx}>
                            {Object.entries(field.fields).map(([k, f]) => (
                                <Input
                                    key={k}
                                    placeholder={f.label || k}
                                    value={entry[k] || ""}
                                    onChange={(e) => {
                                        const copy = [...value];
                                        copy[idx] = { ...copy[idx], [k]: e.target.value };
                                        updateField(key, copy);
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                    <br></br>
                    <Button onClick={() => updateField(key, [...(value || []), {}])}>
                        + Add Entry
                    </Button>
                </div>
            );
        }

        if (field.type === "object") {
            return (
                <div key={key} className="my-2">
                    <label className="font-semibold">{field.label}</label>
                    {Object.entries(field.fields).map(([k, f]) => (
                        <Input
                            key={k}
                            placeholder={f.label}
                            value={value?.[k] || ""}
                            onChange={(e) => {
                                updateField(key, { ...(value || {}), [k]: e.target.value });
                            }}
                        />
                    ))}
                </div>
            );
        }

        return null;
    };

    const currentGroup = stepGroups[step];
    const canGoNext = step < stepGroups.length - 1;
    const canGoPrev = step > 0;

    return (
        <div className="space-y-4">
            {currentGroup.map((key) => renderField(key, fields[key]))}

            <div className="flex justify-between mt-4">
                {canGoPrev && (
                    <Button onClick={() => setStep((prev) => prev - 1)}>Back</Button>
                    )}
                    {canGoNext ? (
                    <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
                    ) : (
                    <Button onClick={handleDownload}>Download PDF</Button>
                )}
            </div>
            <div className="mt-2 text-sm text-gray-600">
                Step {step + 1} of {stepGroups.length}
            </div>
        </div>
    );
}

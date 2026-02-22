import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { resumeData as defaultResumeData } from "../data/resumeData";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const defaultResumes = [
    { id: 1, name: "Mohamed Sinan – Full Stack Developer", label: "Primary Resume", url: "/Mohamed-Sinan-FullStack.pdf", type: "url" },
];

const ResumePage = () => {
    const { data: resumes, addItem: addResume, updateItem: updateResume, deleteItem: deleteResume } = useLocalStorage("resumes", defaultResumes);
    const { data: experience, addItem: addExp, updateItem: updateExp, deleteItem: deleteExp } = useLocalStorage("resumeExperience", defaultResumeData.experience);
    const { data: projects, addItem: addProj, updateItem: updateProj, deleteItem: deleteProj } = useLocalStorage("resumeProjects", defaultResumeData.projects);
    const { data: skills, addItem: addSkill, updateItem: updateSkill, deleteItem: deleteSkill } = useLocalStorage("resumeSkills", defaultResumeData.skills.map((s, i) => ({ ...s, id: i + 1 })));
    const { data: education, addItem: addEdu, updateItem: updateEdu, deleteItem: deleteEdu } = useLocalStorage("resumeEducation", defaultResumeData.education);
    const { data: certs, addItem: addCert, updateItem: updateCert, deleteItem: deleteCert } = useLocalStorage("resumeCerts", defaultResumeData.certifications.map((c, i) => ({ id: i + 1, text: c })));
    const { data: summary, setData: setSummary } = useLocalStorage("resumeSummary", defaultResumeData.summary);

    const [activeView, setActiveView] = useState("resumes");
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [uploadMode, setUploadMode] = useState("url");
    const [editingSummary, setEditingSummary] = useState(false);
    const [summaryDraft, setSummaryDraft] = useState("");

    // ── Resume CRUD ──
    const openResumeModal = (item = null) => {
        setModalType("resume");
        if (item) {
            setEditing(item.id);
            setFormData({ name: item.name, label: item.label, url: item.url, type: item.type });
            setUploadMode(item.type);
        } else {
            setEditing(null);
            setFormData({ name: "", label: "", url: "", type: "url" });
            setUploadMode("url");
        }
        setModalOpen(true);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setFormData((prev) => ({
                ...prev,
                name: prev.name || file.name.replace(/\.[^/.]+$/, ""),
                url: ev.target.result,
                type: "file",
            }));
        };
        reader.readAsDataURL(file);
        setUploadMode("file");
    };

    // ── Details CRUD ──
    const openDetailModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setEditing(item.id);
            if (type === "exp") setFormData({ role: item.role, company: item.company, location: item.location, period: item.period, highlights: item.highlights.join("\n") });
            else if (type === "proj") setFormData({ title: item.title, subtitle: item.subtitle, highlights: item.highlights.join("\n") });
            else if (type === "skill") setFormData({ category: item.category, items: item.items.join(", ") });
            else if (type === "edu") setFormData({ degree: item.degree, institution: item.institution, period: item.period });
            else if (type === "cert") setFormData({ text: item.text });
        } else {
            setEditing(null);
            if (type === "exp") setFormData({ role: "", company: "", location: "", period: "", highlights: "" });
            else if (type === "proj") setFormData({ title: "", subtitle: "", highlights: "" });
            else if (type === "skill") setFormData({ category: "", items: "" });
            else if (type === "edu") setFormData({ degree: "", institution: "", period: "" });
            else if (type === "cert") setFormData({ text: "" });
        }
        setModalOpen(true);
    };

    const handleSave = () => {
        if (modalType === "resume") {
            if (!formData.name.trim() || !formData.url.trim()) return;
            editing ? updateResume(editing, formData) : addResume(formData);
        } else if (modalType === "exp") {
            if (!formData.role.trim()) return;
            const saveData = { ...formData, highlights: formData.highlights.split("\n").filter(Boolean) };
            editing ? updateExp(editing, saveData) : addExp(saveData);
        } else if (modalType === "proj") {
            if (!formData.title.trim()) return;
            const saveData = { ...formData, highlights: formData.highlights.split("\n").filter(Boolean) };
            editing ? updateProj(editing, saveData) : addProj(saveData);
        } else if (modalType === "skill") {
            if (!formData.category.trim()) return;
            const saveData = { category: formData.category, items: formData.items.split(",").map(s => s.trim()).filter(Boolean) };
            editing ? updateSkill(editing, saveData) : addSkill(saveData);
        } else if (modalType === "edu") {
            if (!formData.degree.trim()) return;
            editing ? updateEdu(editing, formData) : addEdu(formData);
        } else if (modalType === "cert") {
            if (!formData.text.trim()) return;
            editing ? updateCert(editing, formData) : addCert(formData);
        }
        setModalOpen(false);
    };

    const handleDelete = (type, id) => {
        if (type === "resume") deleteResume(id);
        else if (type === "exp") deleteExp(id);
        else if (type === "proj") deleteProj(id);
        else if (type === "skill") deleteSkill(id);
        else if (type === "edu") deleteEdu(id);
        else if (type === "cert") deleteCert(id);
        setDeleteConfirm(null);
    };

    const getModalTitle = () => {
        const a = editing ? "Edit" : "Add";
        const map = { resume: "Resume", exp: "Experience", proj: "Project", skill: "Skill Group", edu: "Education", cert: "Certification" };
        return `${a} ${map[modalType] || ""}`;
    };

    const getAddForView = () => {
        if (activeView === "resumes") return () => openResumeModal();
        return null; // Details has inline add buttons
    };

    const DeleteBtn = ({ confirmKey, type, id }) => (
        deleteConfirm === confirmKey ? (
            <div className="delete-confirm">
                <span>Sure?</span>
                <button className="btn btn--danger btn--sm" onClick={() => handleDelete(type, id)}>Yes</button>
                <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
            </div>
        ) : (
            <button className="btn-icon" onClick={() => setDeleteConfirm(confirmKey)}>🗑️</button>
        )
    );

    return (
        <div className="page">
            <PageHeader title="Resume" subtitle="Profile" backTo="/" onAdd={getAddForView()} />

            <div className="tab-bar">
                <button className={`tab-btn ${activeView === "resumes" ? "tab-btn--active" : ""}`} onClick={() => setActiveView("resumes")}>📄 Resumes</button>
                <button className={`tab-btn ${activeView === "details" ? "tab-btn--active" : ""}`} onClick={() => setActiveView("details")}>📋 Details</button>
            </div>

            {/* ════════ RESUMES TAB ════════ */}
            {activeView === "resumes" && (
                <div className="crud-list">
                    {resumes.length === 0 && <p className="empty-state">No resumes yet. Tap + Add to upload.</p>}
                    {resumes.map((resume) => (
                        <div key={resume.id} className="resume-card">
                            <div className="resume-card__icon">📄</div>
                            <div className="resume-card__info">
                                <h3 className="resume-card__name">{resume.name}</h3>
                                {resume.label && <span className="resume-card__label">{resume.label}</span>}
                            </div>
                            <div className="resume-card__actions">
                                <a href={resume.url} className="btn btn--copy" target="_blank" rel="noopener noreferrer" title="View">👁️</a>
                                <a href={resume.url} className="btn btn--copy" download={`${resume.name}.pdf`} title="Download">↓</a>
                                <button className="btn-icon" onClick={() => openResumeModal(resume)} title="Edit">✏️</button>
                                <DeleteBtn confirmKey={`res-${resume.id}`} type="resume" id={resume.id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ════════ DETAILS TAB ════════ */}
            {activeView === "details" && (
                <div className="crud-list">
                    {/* Summary */}
                    <div className="callout-card callout-card--accent">
                        <div className="callout-card__top">
                            <h3 className="callout-card__title">Summary</h3>
                            <button className="btn-icon" onClick={() => { setEditingSummary(true); setSummaryDraft(summary); }}>✏️</button>
                        </div>
                        {editingSummary ? (
                            <div className="form" style={{ marginTop: '8px' }}>
                                <textarea className="form__textarea" rows={5} value={summaryDraft} onChange={(e) => setSummaryDraft(e.target.value)} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn btn--primary btn--sm" onClick={() => { setSummary(summaryDraft); setEditingSummary(false); }}>Save</button>
                                    <button className="btn btn--ghost btn--sm" onClick={() => setEditingSummary(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <p className="callout-card__text" style={{ fontStyle: 'normal' }}>{summary}</p>
                        )}
                    </div>

                    {/* Experience */}
                    <div style={{ marginTop: '16px' }}>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>💼 Experience</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openDetailModal("exp")}>+ Add</button>
                        </div>
                        {experience.map((exp) => (
                            <div key={exp.id} className="exp-card" style={{ marginBottom: '10px' }}>
                                <div className="exp-card__header">
                                    <div style={{ flex: 1 }}>
                                        <h3 className="exp-card__role text-gradient">{exp.role}</h3>
                                        <span className="exp-card__company">{exp.company} — {exp.location}</span>
                                        <span className="exp-card__period">{exp.period}</span>
                                    </div>
                                    <div className="tip-item__actions">
                                        <button className="btn-icon" onClick={() => openDetailModal("exp", exp)}>✏️</button>
                                        <DeleteBtn confirmKey={`exp-${exp.id}`} type="exp" id={exp.id} />
                                    </div>
                                </div>
                                <ul className="exp-card__highlights">
                                    {exp.highlights.map((h, i) => <li key={i} className="exp-card__highlight">{h}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    <div style={{ marginTop: '16px' }}>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>🚀 Projects</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openDetailModal("proj")}>+ Add</button>
                        </div>
                        {projects.map((proj) => (
                            <div key={proj.id} className="project-card" style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 className="project-card__title text-gradient">{proj.title}</h3>
                                        <p className="project-card__subtitle">{proj.subtitle}</p>
                                    </div>
                                    <div className="tip-item__actions">
                                        <button className="btn-icon" onClick={() => openDetailModal("proj", proj)}>✏️</button>
                                        <DeleteBtn confirmKey={`proj-${proj.id}`} type="proj" id={proj.id} />
                                    </div>
                                </div>
                                <ul className="project-card__highlights">
                                    {proj.highlights.map((h, i) => <li key={i} className="project-card__highlight">{h}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div style={{ marginTop: '16px' }}>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>⚡ Skills</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openDetailModal("skill")}>+ Add</button>
                        </div>
                        <div className="skills-grid">
                            {skills.map((group) => (
                                <div key={group.id} className="skill-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 className="skill-group__title" style={{ marginBottom: 0 }}>{group.category}</h4>
                                        <div className="tip-item__actions">
                                            <button className="btn-icon" onClick={() => openDetailModal("skill", group)}>✏️</button>
                                            <DeleteBtn confirmKey={`sk-${group.id}`} type="skill" id={group.id} />
                                        </div>
                                    </div>
                                    <div className="skill-chips" style={{ marginTop: '6px' }}>
                                        {group.items.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div style={{ marginTop: '16px' }}>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>🎓 Education</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openDetailModal("edu")}>+ Add</button>
                        </div>
                        {education.map((edu) => (
                            <div key={edu.id} className="edu-item" style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <span className="edu-item__degree">{edu.degree}</span>
                                        <span className="edu-item__institution">{edu.institution}</span>
                                        <span className="edu-item__period">{edu.period}</span>
                                    </div>
                                    <div className="tip-item__actions">
                                        <button className="btn-icon" onClick={() => openDetailModal("edu", edu)}>✏️</button>
                                        <DeleteBtn confirmKey={`edu-${edu.id}`} type="edu" id={edu.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div style={{ marginTop: '16px' }}>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>✦ Certifications</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openDetailModal("cert")}>+ Add</button>
                        </div>
                        {certs.map((cert) => (
                            <div key={cert.id} className="cert-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ flex: 1 }}>{cert.text}</span>
                                <div className="tip-item__actions">
                                    <button className="btn-icon" onClick={() => openDetailModal("cert", cert)}>✏️</button>
                                    <DeleteBtn confirmKey={`cert-${cert.id}`} type="cert" id={cert.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ════════ MODAL ════════ */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={getModalTitle()}>
                <div className="form">
                    {/* Resume fields */}
                    {modalType === "resume" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Resume Name</label>
                                <input className="form__input" type="text" placeholder="e.g., Full Stack Developer Resume" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Label (optional)</label>
                                <input className="form__input" type="text" placeholder="e.g., For Backend Roles" value={formData.label || ""} onChange={(e) => setFormData({ ...formData, label: e.target.value })} />
                            </div>
                            <div className="tab-bar" style={{ marginBottom: 0 }}>
                                <button className={`tab-btn ${uploadMode === "url" ? "tab-btn--active" : ""}`} onClick={() => setUploadMode("url")}>🔗 URL</button>
                                <button className={`tab-btn ${uploadMode === "file" ? "tab-btn--active" : ""}`} onClick={() => setUploadMode("file")}>📁 Upload</button>
                            </div>
                            {uploadMode === "url" ? (
                                <div className="form__group">
                                    <label className="form__label">Resume URL or Path</label>
                                    <input className="form__input" type="text" placeholder="/resume.pdf or https://..." value={formData.type === "url" ? formData.url : ""} onChange={(e) => setFormData({ ...formData, url: e.target.value, type: "url" })} />
                                </div>
                            ) : (
                                <div className="form__group">
                                    <label className="form__label">Upload PDF</label>
                                    <div className="file-upload">
                                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="file-upload__input" id="resume-file" />
                                        <label htmlFor="resume-file" className="file-upload__label">{formData.type === "file" ? "✓ File selected" : "Choose a file..."}</label>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {/* Experience fields */}
                    {modalType === "exp" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Role / Title</label>
                                <input className="form__input" type="text" placeholder="e.g., Full Stack Developer" value={formData.role || ""} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Company</label>
                                <input className="form__input" type="text" placeholder="e.g., Google" value={formData.company || ""} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Location</label>
                                <input className="form__input" type="text" placeholder="e.g., Bangalore, India" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Period</label>
                                <input className="form__input" type="text" placeholder="e.g., 2024 – Present" value={formData.period || ""} onChange={(e) => setFormData({ ...formData, period: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Highlights (one per line)</label>
                                <textarea className="form__textarea" rows={5} placeholder="Built REST APIs...&#10;Deployed on AWS..." value={formData.highlights || ""} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} />
                            </div>
                        </>
                    )}
                    {/* Project fields */}
                    {modalType === "proj" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Project Name</label>
                                <input className="form__input" type="text" placeholder="e.g., AIVENT" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Subtitle / Tech</label>
                                <input className="form__input" type="text" placeholder="e.g., AI-Powered Event Platform" value={formData.subtitle || ""} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Highlights (one per line)</label>
                                <textarea className="form__textarea" rows={5} placeholder="Architected microservices...&#10;Integrated Groq AI..." value={formData.highlights || ""} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} />
                            </div>
                        </>
                    )}
                    {/* Skill fields */}
                    {modalType === "skill" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Category</label>
                                <input className="form__input" type="text" placeholder="e.g., Backend, Frontend, DevOps" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Skills (comma separated)</label>
                                <textarea className="form__textarea" rows={3} placeholder="Python, Django, Docker, AWS" value={formData.items || ""} onChange={(e) => setFormData({ ...formData, items: e.target.value })} />
                            </div>
                        </>
                    )}
                    {/* Education fields */}
                    {modalType === "edu" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Degree</label>
                                <input className="form__input" type="text" placeholder="e.g., BCA" value={formData.degree || ""} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Institution</label>
                                <input className="form__input" type="text" placeholder="e.g., University of Calicut" value={formData.institution || ""} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Period</label>
                                <input className="form__input" type="text" placeholder="e.g., 2023 – 2026" value={formData.period || ""} onChange={(e) => setFormData({ ...formData, period: e.target.value })} />
                            </div>
                        </>
                    )}
                    {/* Certification fields */}
                    {modalType === "cert" && (
                        <div className="form__group">
                            <label className="form__label">Certification</label>
                            <input className="form__input" type="text" placeholder="e.g., AWS Cloud Practitioner" value={formData.text || ""} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />
                        </div>
                    )}
                    <button className="btn btn--primary form__submit" onClick={handleSave}>
                        {editing ? "Save Changes" : "Create"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ResumePage;

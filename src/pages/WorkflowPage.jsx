import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const defaultSteps = [
    { id: 1, title: "Discovery", description: "Research target companies, job boards, and networking. Identify 5-10 companies that match your skills and interests." },
    { id: 2, title: "Precision Tailoring", description: "Customize resume and cover letter for each role. Highlight relevant keywords from the job description." },
    { id: 3, title: "Deployment", description: "Submit applications, connect with recruiters on LinkedIn, and send follow-up emails within 3-5 days." },
    { id: 4, title: "Technical Dialogue", description: "Prepare for technical interviews: DSA, system design, and project deep-dives. Practice on LeetCode and mock interviews." },
    { id: 5, title: "Execution", description: "Ace the interviews — be confident, ask questions, and showcase your projects and problem-solving skills." },
    { id: 6, title: "Finalization", description: "Negotiate salary, review the offer letter carefully, and confirm joining date. Send a professional acceptance email." },
];

const defaultResearch = [
    { id: 100, category: "🏢 Company Basics", items: ["Company name, industry, and founding year", "Company mission and values statement", "Key products/services they offer", "Company size and office locations", "Recent news or press releases"] },
    { id: 101, category: "📋 Role Research", items: ["Read full job description 3 times — highlight key skills", "Identify required vs. nice-to-have skills", "Match your experience to each requirement", "Research typical salary range for this role", "Understand the team structure and reporting line"] },
    { id: 102, category: "👥 People Research", items: ["Find the hiring manager on LinkedIn", "Look up interviewers' backgrounds", "Check team members' profiles and tech talks", "Read company engineering blog (if available)", "Look for recent company posts on LinkedIn/Twitter"] },
    { id: 103, category: "⚙️ Tech Stack", items: ["Identify their tech stack (StackShare, job listing, GitHub)", "Review any open-source repos the company maintains", "Understand their architecture patterns if possible", "Prepare to discuss overlaps with your experience"] },
];

const WorkflowPage = () => {
    const { data: steps, addItem: addStep, updateItem: updateStep, deleteItem: deleteStep } = useLocalStorage("workflowSteps", defaultSteps);
    const { data: research, addItem: addResearch, updateItem: updateResearch, deleteItem: deleteResearch } = useLocalStorage("workflowResearch", defaultResearch);

    const [activeTab, setActiveTab] = useState("workflow");
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const openModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setEditing(item.id);
            if (type === "step") setFormData({ title: item.title, description: item.description });
            else setFormData({ category: item.category, items: item.items.join("\n") });
        } else {
            setEditing(null);
            if (type === "step") setFormData({ title: "", description: "" });
            else setFormData({ category: "", items: "" });
        }
        setModalOpen(true);
    };

    const handleSave = () => {
        if (modalType === "step") {
            if (!formData.title.trim()) return;
            editing ? updateStep(editing, formData) : addStep(formData);
        } else {
            if (!formData.category.trim()) return;
            const saveData = { category: formData.category, items: formData.items.split("\n").filter(Boolean) };
            editing ? updateResearch(editing, saveData) : addResearch(saveData);
        }
        setModalOpen(false);
    };

    return (
        <div className="page">
            <PageHeader title="Application Playbook" subtitle="Strategy" backTo="/"
                onAdd={() => openModal(activeTab === "workflow" ? "step" : "research")} />

            <div className="tab-bar">
                <button className={`tab-btn ${activeTab === "workflow" ? "tab-btn--active" : ""}`} onClick={() => setActiveTab("workflow")}>🔄 Workflow</button>
                <button className={`tab-btn ${activeTab === "research" ? "tab-btn--active" : ""}`} onClick={() => setActiveTab("research")}>🔍 Research</button>
            </div>

            {activeTab === "workflow" && (
                <div className="timeline">
                    {steps.map((step, i) => (
                        <div key={step.id} className="timeline-step" data-step={String(i + 1).padStart(2, "0")}>
                            <div className="timeline-step__top">
                                <h3 className="timeline-step__title">{step.title}</h3>
                                <div className="tip-item__actions">
                                    <button className="btn-icon" onClick={() => openModal("step", step)}>✏️</button>
                                    {deleteConfirm === step.id ? (
                                        <div className="delete-confirm">
                                            <button className="btn btn--danger btn--sm" onClick={() => { deleteStep(step.id); setDeleteConfirm(null); }}>Yes</button>
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn-icon" onClick={() => setDeleteConfirm(step.id)}>🗑️</button>
                                    )}
                                </div>
                            </div>
                            <p className="timeline-step__desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "research" && (
                <div className="crud-list">
                    {research.map((group) => (
                        <div key={group.id}>
                            <div className="tips-heading-row">
                                <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>{group.category}</h3>
                                <div className="tip-item__actions">
                                    <button className="btn-icon" onClick={() => openModal("research", group)}>✏️</button>
                                    {deleteConfirm === `r-${group.id}` ? (
                                        <div className="delete-confirm">
                                            <button className="btn btn--danger btn--sm" onClick={() => { deleteResearch(group.id); setDeleteConfirm(null); }}>Yes</button>
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn-icon" onClick={() => setDeleteConfirm(`r-${group.id}`)}>🗑️</button>
                                    )}
                                </div>
                            </div>
                            <div className="checklist-list">
                                {group.items.map((item, i) => (
                                    <label key={i} className="checklist-item">
                                        <input type="checkbox" className="checklist-item__check" />
                                        <span className="checklist-item__text">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Item" : "Add Item"}>
                <div className="form">
                    {modalType === "step" ? (
                        <>
                            <div className="form__group">
                                <label className="form__label">Step Title</label>
                                <input className="form__input" type="text" placeholder="e.g., Networking" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Description</label>
                                <textarea className="form__textarea" rows={4} placeholder="Describe what to do..." value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form__group">
                                <label className="form__label">Category Name</label>
                                <input className="form__input" type="text" placeholder="e.g., 📊 Market Research" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Items (one per line)</label>
                                <textarea className="form__textarea" rows={6} placeholder="Item 1&#10;Item 2&#10;Item 3" value={formData.items || ""} onChange={(e) => setFormData({ ...formData, items: e.target.value })} />
                            </div>
                        </>
                    )}
                    <button className="btn btn--primary form__submit" onClick={handleSave}>
                        {editing ? "Save Changes" : "Create"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default WorkflowPage;

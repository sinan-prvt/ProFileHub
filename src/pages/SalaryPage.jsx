import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { salaryNegotiationData } from "../data/salaryNegotiationData";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const SalaryPage = () => {
    const { data: rules, addItem: addRule, updateItem: updateRule, deleteItem: deleteRule } = useLocalStorage(
        "salaryRules",
        salaryNegotiationData.goldenRules.map((r, i) => ({ id: i + 1, ...r }))
    );
    const { data: scripts, addItem: addScript, updateItem: updateScript, deleteItem: deleteScript } = useLocalStorage(
        "salaryScripts",
        salaryNegotiationData.scripts
    );
    const { data: research, addItem: addResearch, updateItem: updateResearch, deleteItem: deleteResearch } = useLocalStorage(
        "salaryResearch",
        salaryNegotiationData.marketResearch.map((r, i) => ({ id: i + 50, ...r }))
    );

    const [activeTab, setActiveTab] = useState("rules");
    const [copiedItem, setCopiedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const copyText = async (text, id) => {
        try { await navigator.clipboard.writeText(text); } catch {
            const ta = document.createElement("textarea"); ta.value = text;
            document.body.appendChild(ta); ta.select(); document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopiedItem(id);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setEditing(item.id);
            if (type === "rule") setFormData({ title: item.title, desc: item.desc });
            else if (type === "script") setFormData({ title: item.title, script: item.script });
            else setFormData({ platform: item.platform, url: item.url, use: item.use });
        } else {
            setEditing(null);
            if (type === "rule") setFormData({ title: "", desc: "" });
            else if (type === "script") setFormData({ title: "", script: "" });
            else setFormData({ platform: "", url: "", use: "" });
        }
        setModalOpen(true);
    };

    const handleSave = () => {
        if (modalType === "rule") {
            if (!formData.title.trim()) return;
            editing ? updateRule(editing, formData) : addRule(formData);
        } else if (modalType === "script") {
            if (!formData.title.trim()) return;
            editing ? updateScript(editing, formData) : addScript(formData);
        } else {
            if (!formData.platform.trim()) return;
            editing ? updateResearch(editing, formData) : addResearch(formData);
        }
        setModalOpen(false);
    };

    const getModalTitle = () => {
        const a = editing ? "Edit" : "Add";
        if (modalType === "rule") return `${a} Rule`;
        if (modalType === "script") return `${a} Script`;
        return `${a} Resource`;
    };

    return (
        <div className="page">
            <PageHeader title="Salary Playbook" subtitle="Negotiation" backTo="/"
                onAdd={() => openModal(activeTab === "rules" ? "rule" : activeTab === "scripts" ? "script" : "resource")} />

            <div className="tab-bar">
                <button className={`tab-btn ${activeTab === "rules" ? "tab-btn--active" : ""}`} onClick={() => setActiveTab("rules")}>📌 Rules</button>
                <button className={`tab-btn ${activeTab === "scripts" ? "tab-btn--active" : ""}`} onClick={() => setActiveTab("scripts")}>💬 Scripts</button>
                <button className={`tab-btn ${activeTab === "research" ? "tab-btn--active" : ""}`} onClick={() => setActiveTab("research")}>🔍 Research</button>
            </div>

            {/* Rules */}
            {activeTab === "rules" && (
                <div className="crud-list">
                    {rules.map((rule, i) => (
                        <div key={rule.id} className="rule-card">
                            <div className="rule-card__number">{String(i + 1).padStart(2, "0")}</div>
                            <div style={{ flex: 1 }}>
                                <h3 className="rule-card__title">{rule.title}</h3>
                                <p className="rule-card__desc">{rule.desc}</p>
                            </div>
                            <div className="tip-item__actions" style={{ flexShrink: 0 }}>
                                <button className="btn-icon" onClick={() => openModal("rule", rule)}>✏️</button>
                                {deleteConfirm === rule.id ? (
                                    <div className="delete-confirm">
                                        <button className="btn btn--danger btn--sm" onClick={() => { deleteRule(rule.id); setDeleteConfirm(null); }}>Yes</button>
                                        <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                    </div>
                                ) : (
                                    <button className="btn-icon" onClick={() => setDeleteConfirm(rule.id)}>🗑️</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Scripts */}
            {activeTab === "scripts" && (
                <div className="crud-list">
                    {scripts.map((item) => (
                        <div key={item.id} className="callout-card">
                            <div className="callout-card__top">
                                <h3 className="callout-card__title">{item.title}</h3>
                                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                    <button className={`btn btn--copy ${copiedItem === item.id ? "copied" : ""}`} onClick={() => copyText(item.script, item.id)}>
                                        {copiedItem === item.id ? "✓ Copied" : "📋 Copy"}
                                    </button>
                                    <button className="btn-icon" onClick={() => openModal("script", item)}>✏️</button>
                                    {deleteConfirm === `s-${item.id}` ? (
                                        <div className="delete-confirm">
                                            <button className="btn btn--danger btn--sm" onClick={() => { deleteScript(item.id); setDeleteConfirm(null); }}>Yes</button>
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn-icon" onClick={() => setDeleteConfirm(`s-${item.id}`)}>🗑️</button>
                                    )}
                                </div>
                            </div>
                            <p className="callout-card__text">{item.script}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Research */}
            {activeTab === "research" && (
                <div className="crud-list">
                    {research.map((item) => (
                        <div key={item.id} className="resource-card" style={{ cursor: 'default' }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="resource-card__info">
                                <h3 className="resource-card__title">{item.platform}</h3>
                                <p className="resource-card__use">{item.use}</p>
                            </a>
                            <div className="tip-item__actions" style={{ flexShrink: 0 }}>
                                <button className="btn-icon" onClick={() => openModal("resource", item)}>✏️</button>
                                {deleteConfirm === `r-${item.id}` ? (
                                    <div className="delete-confirm">
                                        <button className="btn btn--danger btn--sm" onClick={() => { deleteResearch(item.id); setDeleteConfirm(null); }}>Yes</button>
                                        <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                    </div>
                                ) : (
                                    <button className="btn-icon" onClick={() => setDeleteConfirm(`r-${item.id}`)}>🗑️</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={getModalTitle()}>
                <div className="form">
                    {modalType === "rule" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Rule Title</label>
                                <input className="form__input" type="text" placeholder="e.g., Always negotiate" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Description</label>
                                <textarea className="form__textarea" rows={4} placeholder="Why this rule matters..." value={formData.desc || ""} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} />
                            </div>
                        </>
                    )}
                    {modalType === "script" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Scenario Title</label>
                                <input className="form__input" type="text" placeholder="e.g., When asked about expectations" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Script</label>
                                <textarea className="form__textarea" rows={6} placeholder="What to say..." value={formData.script || ""} onChange={(e) => setFormData({ ...formData, script: e.target.value })} />
                            </div>
                        </>
                    )}
                    {modalType === "resource" && (
                        <>
                            <div className="form__group">
                                <label className="form__label">Platform Name</label>
                                <input className="form__input" type="text" placeholder="e.g., Glassdoor" value={formData.platform || ""} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">URL</label>
                                <input className="form__input" type="url" placeholder="https://..." value={formData.url || ""} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Use</label>
                                <input className="form__input" type="text" placeholder="What it's for..." value={formData.use || ""} onChange={(e) => setFormData({ ...formData, use: e.target.value })} />
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

export default SalaryPage;

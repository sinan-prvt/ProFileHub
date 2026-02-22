import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { firstCallGuideData } from "../data/firstCallGuideData";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const ChevronIcon = () => (
    <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
);

const FirstCallPage = () => {
    const { data: qaData, addItem: addQA, updateItem: updateQA, deleteItem: deleteQA } = useLocalStorage(
        "firstCallQA",
        firstCallGuideData.commonQuestions.map((q) => ({ ...q }))
    );
    const { data: dosData, addItem: addDo, updateItem: updateDo, deleteItem: deleteDo } = useLocalStorage(
        "firstCallDos",
        firstCallGuideData.dos.map((d, i) => ({ id: i + 1, text: d }))
    );
    const { data: dontsData, addItem: addDont, updateItem: updateDont, deleteItem: deleteDont } = useLocalStorage(
        "firstCallDonts",
        firstCallGuideData.donts.map((d, i) => ({ id: i + 100, text: d }))
    );
    const { data: checklistData, addItem: addCheck, updateItem: updateCheck, deleteItem: deleteCheck } = useLocalStorage(
        "firstCallChecklist",
        firstCallGuideData.preCallChecklist.map((c, i) => ({ id: i + 200, text: c }))
    );
    const { data: scriptData, setData: setScript } = useLocalStorage("firstCallScript", firstCallGuideData.intro.content);

    const [activeTab, setActiveTab] = useState("script");
    const [openId, setOpenId] = useState(null);
    const [copiedItem, setCopiedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [editingScript, setEditingScript] = useState(false);
    const [scriptDraft, setScriptDraft] = useState("");

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
            if (type === "qa") setFormData({ q: item.q, a: item.a });
            else setFormData({ text: item.text });
        } else {
            setEditing(null);
            if (type === "qa") setFormData({ q: "", a: "" });
            else setFormData({ text: "" });
        }
        setModalOpen(true);
    };

    const handleSave = () => {
        if (modalType === "qa") {
            if (!formData.q.trim() || !formData.a.trim()) return;
            editing ? updateQA(editing, formData) : addQA(formData);
        } else if (modalType === "do") {
            if (!formData.text.trim()) return;
            editing ? updateDo(editing, formData) : addDo(formData);
        } else if (modalType === "dont") {
            if (!formData.text.trim()) return;
            editing ? updateDont(editing, formData) : addDont(formData);
        } else if (modalType === "checklist") {
            if (!formData.text.trim()) return;
            editing ? updateCheck(editing, formData) : addCheck(formData);
        }
        setModalOpen(false);
    };

    const tabs = [
        { key: "script", label: "📞 Script" },
        { key: "qa", label: "❓ Q&A" },
        { key: "tips", label: "✅ Tips" },
        { key: "checklist", label: "📋 Checklist" },
    ];

    const getModalTitle = () => {
        const action = editing ? "Edit" : "Add";
        if (modalType === "qa") return `${action} Q&A`;
        if (modalType === "do") return `${action} Do's Tip`;
        if (modalType === "dont") return `${action} Don'ts Tip`;
        if (modalType === "checklist") return `${action} Checklist Item`;
        return "";
    };

    const getAddHandler = () => {
        if (activeTab === "qa") return () => openModal("qa");
        if (activeTab === "tips") return null; // two add buttons shown inline
        if (activeTab === "checklist") return () => openModal("checklist");
        return null;
    };

    return (
        <div className="page">
            <PageHeader title="HR Call Guide" subtitle="First Call" backTo="/" onAdd={getAddHandler()} />

            <div className="tab-bar">
                {tabs.map((tab) => (
                    <button key={tab.key} className={`tab-btn ${activeTab === tab.key ? "tab-btn--active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Script Tab */}
            {activeTab === "script" && (
                <div className="crud-list">
                    <div className="callout-card callout-card--accent">
                        <div className="callout-card__top">
                            <h3 className="callout-card__title">Opening Script</h3>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button className={`btn btn--copy ${copiedItem === "intro" ? "copied" : ""}`} onClick={() => copyText(scriptData, "intro")}>
                                    {copiedItem === "intro" ? "✓ Copied" : "📋 Copy"}
                                </button>
                                <button className="btn btn--ghost btn--sm" onClick={() => { setEditingScript(true); setScriptDraft(scriptData); }}>✏️</button>
                            </div>
                        </div>
                        {editingScript ? (
                            <div className="form" style={{ marginTop: '8px' }}>
                                <textarea className="form__textarea" rows={5} value={scriptDraft} onChange={(e) => setScriptDraft(e.target.value)} />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn btn--primary btn--sm" onClick={() => { setScript(scriptDraft); setEditingScript(false); }}>Save</button>
                                    <button className="btn btn--ghost btn--sm" onClick={() => setEditingScript(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <p className="callout-card__text">{scriptData}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Q&A Tab */}
            {activeTab === "qa" && (
                <div className="crud-list">
                    {qaData.length === 0 && <p className="empty-state">No Q&A yet. Tap + Add.</p>}
                    {qaData.map((item) => (
                        <div key={item.id} className={`crud-card ${openId === item.id ? "crud-card--open" : ""}`}>
                            <div className="crud-card__header" onClick={() => setOpenId(openId === item.id ? null : item.id)}>
                                <div className="crud-card__info"><h3 className="crud-card__title">{item.q}</h3></div>
                                <ChevronIcon />
                            </div>
                            {openId === item.id && (
                                <div className="crud-card__body">
                                    <pre className="crud-card__content">{item.a}</pre>
                                    <div className="crud-card__actions">
                                        <button className={`btn btn--copy ${copiedItem === item.id ? "copied" : ""}`} onClick={() => copyText(item.a, item.id)}>
                                            {copiedItem === item.id ? "✓ Copied" : "📋 Copy"}
                                        </button>
                                        <button className="btn btn--ghost btn--sm" onClick={() => openModal("qa", item)}>✏️ Edit</button>
                                        {deleteConfirm === item.id ? (
                                            <div className="delete-confirm">
                                                <span>Sure?</span>
                                                <button className="btn btn--danger btn--sm" onClick={() => { deleteQA(item.id); setDeleteConfirm(null); }}>Yes</button>
                                                <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                            </div>
                                        ) : (
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(item.id)}>🗑️ Delete</button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Tips Tab */}
            {activeTab === "tips" && (
                <div className="crud-list">
                    <div>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--do" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>✅ Do This</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openModal("do")}>+ Add</button>
                        </div>
                        <div className="tips-list">
                            {dosData.map((tip) => (
                                <div key={tip.id} className="tip-item tip-item--do tip-item--editable">
                                    <span style={{ flex: 1 }}>{tip.text}</span>
                                    <div className="tip-item__actions">
                                        <button className="btn-icon" onClick={() => openModal("do", tip)}>✏️</button>
                                        {deleteConfirm === `do-${tip.id}` ? (
                                            <div className="delete-confirm">
                                                <button className="btn btn--danger btn--sm" onClick={() => { deleteDo(tip.id); setDeleteConfirm(null); }}>Yes</button>
                                                <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                            </div>
                                        ) : (
                                            <button className="btn-icon" onClick={() => setDeleteConfirm(`do-${tip.id}`)}>🗑️</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <div className="tips-heading-row">
                            <h3 className="tips-heading tips-heading--dont" style={{ marginBottom: 0, borderBottom: 'none', flex: 1 }}>❌ Avoid This</h3>
                            <button className="btn btn--ghost btn--sm" onClick={() => openModal("dont")}>+ Add</button>
                        </div>
                        <div className="tips-list">
                            {dontsData.map((tip) => (
                                <div key={tip.id} className="tip-item tip-item--dont tip-item--editable">
                                    <span style={{ flex: 1 }}>{tip.text}</span>
                                    <div className="tip-item__actions">
                                        <button className="btn-icon" onClick={() => openModal("dont", tip)}>✏️</button>
                                        {deleteConfirm === `dont-${tip.id}` ? (
                                            <div className="delete-confirm">
                                                <button className="btn btn--danger btn--sm" onClick={() => { deleteDont(tip.id); setDeleteConfirm(null); }}>Yes</button>
                                                <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                            </div>
                                        ) : (
                                            <button className="btn-icon" onClick={() => setDeleteConfirm(`dont-${tip.id}`)}>🗑️</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Checklist Tab */}
            {activeTab === "checklist" && (
                <div className="checklist-list">
                    {checklistData.map((item) => (
                        <div key={item.id} className="checklist-item checklist-item--editable">
                            <input type="checkbox" className="checklist-item__check" />
                            <span className="checklist-item__text" style={{ flex: 1 }}>{item.text}</span>
                            <div className="tip-item__actions">
                                <button className="btn-icon" onClick={() => openModal("checklist", item)}>✏️</button>
                                {deleteConfirm === `cl-${item.id}` ? (
                                    <div className="delete-confirm">
                                        <button className="btn btn--danger btn--sm" onClick={() => { deleteCheck(item.id); setDeleteConfirm(null); }}>Yes</button>
                                        <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                    </div>
                                ) : (
                                    <button className="btn-icon" onClick={() => setDeleteConfirm(`cl-${item.id}`)}>🗑️</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={getModalTitle()}>
                <div className="form">
                    {modalType === "qa" ? (
                        <>
                            <div className="form__group">
                                <label className="form__label">Question</label>
                                <input className="form__input" type="text" placeholder="e.g., Why should we hire you?" value={formData.q || ""} onChange={(e) => setFormData({ ...formData, q: e.target.value })} />
                            </div>
                            <div className="form__group">
                                <label className="form__label">Answer</label>
                                <textarea className="form__textarea" rows={6} placeholder="Your prepared answer..." value={formData.a || ""} onChange={(e) => setFormData({ ...formData, a: e.target.value })} />
                            </div>
                        </>
                    ) : (
                        <div className="form__group">
                            <label className="form__label">{modalType === "checklist" ? "Checklist Item" : "Tip"}</label>
                            <input className="form__input" type="text" placeholder="Type here..." value={formData.text || ""} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />
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

export default FirstCallPage;

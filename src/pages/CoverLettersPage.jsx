import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { coverLetters as defaultData } from "../data/coverLettersData";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const CoverLettersPage = () => {
    const { data, addItem, updateItem, deleteItem } = useLocalStorage("coverLetters", defaultData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [formData, setFormData] = useState({ title: "", recipient: "", content: "" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const openCreate = () => {
        setEditing(null);
        setFormData({ title: "", recipient: "", content: "" });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item.id);
        setFormData({ title: item.title, recipient: item.recipient || "", content: item.content });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title.trim() || !formData.content.trim()) return;
        if (editing) {
            updateItem(editing, formData);
        } else {
            addItem(formData);
        }
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        deleteItem(id);
        setDeleteConfirm(null);
        if (openId === id) setOpenId(null);
    };

    const copyToClipboard = async (text, id) => {
        try { await navigator.clipboard.writeText(text); } catch {
            const ta = document.createElement("textarea"); ta.value = text;
            document.body.appendChild(ta); ta.select(); document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="page">
            <PageHeader title="Cover Letters" subtitle="Narrative" backTo="/" onAdd={openCreate} />

            <div className="crud-list">
                {data.length === 0 && <p className="empty-state">No cover letters yet. Tap + Add to create one.</p>}
                {data.map((letter) => (
                    <div key={letter.id} className={`crud-card ${openId === letter.id ? "crud-card--open" : ""}`}>
                        <div className="crud-card__header" onClick={() => setOpenId(openId === letter.id ? null : letter.id)}>
                            <div className="crud-card__info">
                                <h3 className="crud-card__title">{letter.title}</h3>
                                {letter.recipient && <span className="crud-card__sub">{letter.recipient}</span>}
                            </div>
                            <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
                        </div>

                        {openId === letter.id && (
                            <div className="crud-card__body">
                                <pre className="crud-card__content">{letter.content}</pre>
                                <div className="crud-card__actions">
                                    <button className={`btn btn--copy ${copiedId === letter.id ? "copied" : ""}`} onClick={() => copyToClipboard(letter.content, letter.id)}>
                                        {copiedId === letter.id ? "✓ Copied" : "📋 Copy"}
                                    </button>
                                    <button className="btn btn--ghost btn--sm" onClick={() => openEdit(letter)}>✏️ Edit</button>
                                    {deleteConfirm === letter.id ? (
                                        <div className="delete-confirm">
                                            <span>Sure?</span>
                                            <button className="btn btn--danger btn--sm" onClick={() => handleDelete(letter.id)}>Yes</button>
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(letter.id)}>🗑️ Delete</button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Cover Letter" : "New Cover Letter"}>
                <div className="form">
                    <div className="form__group">
                        <label className="form__label">Title</label>
                        <input className="form__input" type="text" placeholder="e.g., Frontend Developer at Google" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Recipient (optional)</label>
                        <input className="form__input" type="text" placeholder="e.g., Hiring Manager" value={formData.recipient} onChange={(e) => setFormData({ ...formData, recipient: e.target.value })} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Content</label>
                        <textarea className="form__textarea" rows={10} placeholder="Paste or write your cover letter..." value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                    </div>
                    <button className="btn btn--primary form__submit" onClick={handleSave}>
                        {editing ? "Save Changes" : "Create"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CoverLettersPage;

import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { linkedInTemplates as defaultData } from "../data/linkedInData";

const TAG_COLORS = {
    "Developer / Engineer": "tag--blue",
    "HR / Recruiter": "tag--green",
    "Senior Developer": "tag--purple",
    "Follow-Up Message": "tag--orange",
};

const LinkedInPage = () => {
    const { data, setData, addItem, updateItem, deleteItem } = useLocalStorage("linkedInTemplates_v1", defaultData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [formData, setFormData] = useState({ title: "", tag: "", content: "" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        setData((prev) => {
            const existingIds = new Set(prev.map((item) => item.id));
            const missingDefaults = defaultData.filter((item) => !existingIds.has(item.id));
            return missingDefaults.length > 0 ? [...prev, ...missingDefaults] : prev;
        });
    }, [setData]);

    const openCreate = () => {
        setEditing(null);
        setFormData({ title: "", tag: "", content: "" });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item.id);
        setFormData({ title: item.title, tag: item.tag || "", content: item.content });
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
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="page">
            <PageHeader title="LinkedIn Messages" subtitle="Connection Templates" backTo="/" onAdd={openCreate} />

            <div className="crud-list">
                {data.length === 0 && <p className="empty-state">No LinkedIn templates yet.</p>}
                {data.map((t) => (
                    <div key={t.id} className={`crud-card ${openId === t.id ? "crud-card--open" : ""}`}>
                        <div className="crud-card__header" onClick={() => setOpenId(openId === t.id ? null : t.id)}>
                            <div className="crud-card__info">
                                <h3 className="crud-card__title">{t.title}</h3>
                                {t.tag && (
                                    <span className={`crud-card__tag ${TAG_COLORS[t.tag] || ""}`}>
                                        {t.tag}
                                    </span>
                                )}
                            </div>
                            <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
                        </div>

                        {openId === t.id && (
                            <div className="crud-card__body">
                                <pre className="crud-card__content">{t.content}</pre>
                                <div className="crud-card__actions">
                                    <button className={`btn btn--copy ${copiedId === t.id ? "copied" : ""}`} onClick={() => copyToClipboard(t.content, t.id)}>
                                        {copiedId === t.id ? "✓ Copied" : "Copy"}
                                    </button>
                                    <button className="btn btn--ghost btn--sm" onClick={() => openEdit(t)}>Edit</button>
                                    {deleteConfirm === t.id ? (
                                        <div className="delete-confirm">
                                            <span>Sure?</span>
                                            <button className="btn btn--danger btn--sm" onClick={() => handleDelete(t.id)}>Yes</button>
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(t.id)}>Delete</button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit LinkedIn Template" : "New LinkedIn Template"}>
                <div className="form">
                    <div className="form__group">
                        <label className="form__label">Title</label>
                        <input className="form__input" type="text" placeholder="e.g., Connection Request to Recruiter" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Tag (optional)</label>
                        <input className="form__input" type="text" placeholder="e.g., HR / Recruiter" value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Message</label>
                        <textarea className="form__textarea" rows={10} placeholder="Write your LinkedIn message here..." value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                    </div>
                    <button className="btn btn--primary form__submit" onClick={handleSave}>
                        {editing ? "Save Changes" : "Create"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default LinkedInPage;

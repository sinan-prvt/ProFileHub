import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { emailTemplates as defaultData } from "../data/emailTemplatesData";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const CATEGORIES = ["All", "Applying", "Follow-Up", "Post-Interview", "Networking", "Offer"];

const EmailsPage = () => {
    const { data, setData, addItem, updateItem, deleteItem } = useLocalStorage("emailTemplates_v2", defaultData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [formData, setFormData] = useState({ title: "", category: "Applying", content: "" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        // Keep saved templates in sync with new defaults and fix stale placeholders.
        setData((prev) => {
            const latestTemplate = defaultData.find((item) => item.id === 10);
            let changed = false;
            const safePrev = Array.isArray(prev) ? prev : [];
            const existingIds = new Set(safePrev.map((item) => item.id));
            const missingDefaults = defaultData.filter((item) => !existingIds.has(item.id));
            const withMissingDefaults = missingDefaults.length > 0 ? [...safePrev, ...missingDefaults] : safePrev;

            if (missingDefaults.length > 0) changed = true;

            const next = withMissingDefaults.map((item) => {
                if (item.id !== 10) return item;
                if (!latestTemplate) return item;

                const hasOldPlaceholders =
                    typeof item.content === "string" &&
                    (item.content.includes("github.com/yourusername") ||
                        item.content.includes("linkedin.com/in/yourprofile"));

                if (!hasOldPlaceholders) return item;

                changed = true;
                return {
                    ...item,
                    title: latestTemplate.title,
                    category: latestTemplate.category,
                    content: latestTemplate.content,
                };
            });

            return changed ? next : prev;
        });
    }, [setData]);

    const filtered = activeCategory === "All" ? data : data.filter((t) => t.category === activeCategory);

    const openCreate = () => {
        setEditing(null);
        setFormData({ title: "", category: "Applying", content: "" });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item.id);
        setFormData({ title: item.title, category: item.category || "Applying", content: item.content });
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
            <PageHeader title="Email & Messages" subtitle="Templates" backTo="/" onAdd={openCreate} />

            <div className="tab-bar">
                {CATEGORIES.map((cat) => (
                    <button key={cat} className={`tab-btn ${activeCategory === cat ? "tab-btn--active" : ""}`}
                        onClick={() => { setActiveCategory(cat); setOpenId(null); }}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="crud-list">
                {filtered.length === 0 && <p className="empty-state">No templates in this category.</p>}
                {filtered.map((t) => (
                    <div key={t.id} className={`crud-card ${openId === t.id ? "crud-card--open" : ""}`}>
                        <div className="crud-card__header" onClick={() => setOpenId(openId === t.id ? null : t.id)}>
                            <div className="crud-card__info">
                                <h3 className="crud-card__title">{t.title}</h3>
                                <span className="crud-card__sub">{t.category}</span>
                            </div>
                            <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
                        </div>

                        {openId === t.id && (
                            <div className="crud-card__body">
                                <pre className="crud-card__content">{t.content}</pre>
                                <div className="crud-card__actions">
                                    <button className={`btn btn--copy ${copiedId === t.id ? "copied" : ""}`} onClick={() => copyToClipboard(t.content, t.id)}>
                                        {copiedId === t.id ? "✓ Copied" : "📋 Copy"}
                                    </button>
                                    <button className="btn btn--ghost btn--sm" onClick={() => openEdit(t)}>✏️ Edit</button>
                                    {deleteConfirm === t.id ? (
                                        <div className="delete-confirm">
                                            <span>Sure?</span>
                                            <button className="btn btn--danger btn--sm" onClick={() => handleDelete(t.id)}>Yes</button>
                                            <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn--ghost btn--sm" onClick={() => setDeleteConfirm(t.id)}>🗑️ Delete</button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Template" : "New Template"}>
                <div className="form">
                    <div className="form__group">
                        <label className="form__label">Title</label>
                        <input className="form__input" type="text" placeholder="e.g., Follow-up after interview" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Category</label>
                        <select className="form__input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                            {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form__group">
                        <label className="form__label">Content</label>
                        <textarea className="form__textarea" rows={10} placeholder="Paste or write your template..." value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                    </div>
                    <button className="btn btn--primary form__submit" onClick={handleSave}>
                        {editing ? "Save Changes" : "Create"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default EmailsPage;

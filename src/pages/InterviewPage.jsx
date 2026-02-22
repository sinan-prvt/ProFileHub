import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

const defaultQuestions = {
    technical: [
        { id: 1, q: "Explain the difference between Django's FBV and CBV.", a: "Function-Based Views (FBVs) are simple functions, good for simple logic. Class-Based Views (CBVs) use classes for better code reuse through inheritance, making them ideal for complex, shared logic." },
        { id: 2, q: "What is the Django ORM and how does it work?", a: "Django ORM translates Python classes into database tables and Python expressions into SQL. It provides a lazy, chainable API for data operations." },
        { id: 3, q: "How do you optimize a slow Django query?", a: "Strategies: 1) select_related() and prefetch_related() to reduce N+1 queries. 2) Database indexes. 3) Caching with Redis. 4) Profiling with Debug Toolbar." },
        { id: 4, q: "Explain REST API design principles.", a: "Principles: Stateless requests, Resource-based URLs, Standard HTTP methods (GET, POST, etc.), and JSON formatted responses with proper status codes." },
        { id: 5, q: "What is Docker and why use it?", a: "Docker packages apps into containers for consistency across environments. It eliminates 'works on my machine' issues and scales easily with orchestration." },
    ],
    behavioral: [
        { id: 6, q: "Tell me about a challenging deadline.", a: "Use STAR: Describe a high-stakes project (Situation), your role (Task), how you prioritized and executed (Action), and the successful delivery/outcome (Result)." },
        { id: 7, q: "How do you handle team disagreements?", a: "I listen actively, focus on technical merits, and suggest data-driven proof-of-concepts to reach the best objective solution for the project." },
        { id: 8, q: "Describe a project you're proud of.", a: "Highlight a project demonstrating technical complexity and measurable impact (e.g., performance gains or error reduction) using the STAR method." },
    ],
};

const InterviewPage = () => {
    const { data, addItem, updateItem, deleteItem } = useLocalStorage("interviewQuestions", [
        ...defaultQuestions.technical.map(q => ({ ...q, category: "technical" })),
        ...defaultQuestions.behavioral.map(q => ({ ...q, category: "behavioral" })),
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("technical");
    const [copiedId, setCopiedId] = useState(null);
    const [formData, setFormData] = useState({ q: "", a: "", category: "technical" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filtered = data.filter((item) => item.category === activeCategory);

    const openCreate = () => {
        setEditing(null);
        setFormData({ q: "", a: "", category: activeCategory });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditing(item.id);
        setFormData({ q: item.q, a: item.a, category: item.category });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.q.trim() || !formData.a.trim()) return;
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
    };

    const copyText = async (text, id) => {
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
            <PageHeader title="Interview Q&A" subtitle="Preparation" backTo="/" onAdd={openCreate} />

            <div className="tab-bar">
                <button className={`tab-btn ${activeCategory === "technical" ? "tab-btn--active" : ""}`}
                    onClick={() => { setActiveCategory("technical"); setOpenId(null); }}>
                    Technical
                </button>
                <button className={`tab-btn ${activeCategory === "behavioral" ? "tab-btn--active" : ""}`}
                    onClick={() => { setActiveCategory("behavioral"); setOpenId(null); }}>
                    Behavioral
                </button>
            </div>

            <div className="crud-list">
                {filtered.length === 0 && <p className="empty-state">No questions yet. Tap + Add to create one.</p>}
                {filtered.map((item) => (
                    <div key={item.id} className={`crud-card ${openId === item.id ? "crud-card--open" : ""}`}>
                        <div className="crud-card__header" onClick={() => setOpenId(openId === item.id ? null : item.id)}>
                            <div className="crud-card__info">
                                <h3 className="crud-card__title">{item.q}</h3>
                            </div>
                            <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
                        </div>

                        {openId === item.id && (
                            <div className="crud-card__body">
                                <p className="crud-card__content">{item.a}</p>
                                <div className="crud-card__actions">
                                    <button className={`btn btn--copy ${copiedId === item.id ? "copied" : ""}`} onClick={() => copyText(item.a, item.id)}>
                                        {copiedId === item.id ? "✓ Copied" : "📋 Copy"}
                                    </button>
                                    <button className="btn btn--ghost btn--sm" onClick={() => openEdit(item)}>✏️ Edit</button>
                                    {deleteConfirm === item.id ? (
                                        <div className="delete-confirm">
                                            <span>Sure?</span>
                                            <button className="btn btn--danger btn--sm" onClick={() => handleDelete(item.id)}>Yes</button>
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

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Q&A" : "New Q&A"}>
                <div className="form">
                    <div className="form__group">
                        <label className="form__label">Category</label>
                        <select className="form__input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                            <option value="technical">Technical</option>
                            <option value="behavioral">Behavioral</option>
                        </select>
                    </div>
                    <div className="form__group">
                        <label className="form__label">Question</label>
                        <input className="form__input" type="text" placeholder="e.g., What is Django middleware?" value={formData.q} onChange={(e) => setFormData({ ...formData, q: e.target.value })} />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Answer</label>
                        <textarea className="form__textarea" rows={6} placeholder="Write your prepared answer..." value={formData.a} onChange={(e) => setFormData({ ...formData, a: e.target.value })} />
                    </div>
                    <button className="btn btn--primary form__submit" onClick={handleSave}>
                        {editing ? "Save Changes" : "Create"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default InterviewPage;

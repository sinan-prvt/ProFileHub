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
        { id: 6, q: "Why should we hire you?", a: "You should hire me because I have hands-on experience in both backend and frontend development through my internship and projects. I've worked with Python, Django, React.js, SQL, and AWS to build web applications. I'm a quick learner, enjoy solving problems, and I'm eager to learn, grow, and contribute to your team from day one." },
        { id: 7, q: "Why do you want to join our company?", a: "I'm drawn your company focus on innovation solutionsin python full stack, because i have worked on projects like that, and I'm eager to grow in that direction." },
        { id: 8, q: "What are your long-term career goals?", a: "My long-term goal is to become a lead achitect in python full-sack development, designing scalable systems and integrating Ai solutions to solve real-world problems. This role is a key step as it align with both my current skills and where i want to grow." },
        { id: 9, q: "Tell me about your internship experience?", a: "I completed my Python Full Stack Development internship at Bridgeon Skillvercity. It's a training institute that focuses on hands-on project development. During the internship, I built full-stack web applications using Django and React, developed REST APIs, worked with PostgreSQL, implemented authentication, and used Git for version control. It gave me practical experience and strengthened my technical and problem-solving skills." },
        { id: 10, q: "What projects have you worked on?", a: "During my internship, I worked on three major full-stack projects. The first was Aivent, an AI-powered event management platform where I worked with Django REST Framework, React, PostgreSQL, Docker, and AWS to build scalable backend services and responsive frontend interfaces. The second was Resiko, an AI-based resume optimization platform that uses LLMs to analyze resumes, suggest improvements, and generate ATS-friendly resumes. The third was HopyfyCart, an e-commerce application where I developed features such as user authentication, product management, shopping cart, payment integration, and order management using Django, React, and PostgreSQL. These projects helped me gain hands-on experience in full-stack development and understand how to build real-world web applications." },
        { id: 11, q: "Which project are you most proud of and why?", a: "The project I'm most proud of is Aivent, an AI-powered event management system. During this project, I worked on both the backend and frontend. On the backend, I developed REST APIs using Django and Django REST Framework and implemented Celery with Redis and RabbitMQ to handle asynchronous background tasks like notifications and email processing. I documented APIs using Swagger, used Docker for containerization, and followed a microservices architecture to make the application more scalable and maintainable. On the frontend, I built responsive interfaces using React. I also worked with PostgreSQL, JWT authentication, and deployed the application on AWS. This project taught me a lot about building scalable, production-style applications and strengthened my problem-solving and full-stack development skills." },
        { id: 12, q: "Tell me about a challenge you faced in a project?", a: "During the development of Aivent, one challenge I faced was handling time-consuming tasks like sending confirmation emails and notifications after a user registered or booked an event. Initially, these tasks were processed synchronously, which made the API response slow and affected the user experience. To solve this, I implemented Celery for asynchronous task processing, used RabbitMQ as the message broker, and Redis for caching and task management. This moved the background tasks out of the main request flow, so the API could respond immediately while the tasks were processed in the background. As a result, the application became more responsive, and I gained practical experience working with asynchronous processing and scalable backend architecture." },
        { id: 13, q: "", a: "" },
        { id: 14, q: "", a: "" },
        { id: 15, q: "", a: "" },
        { id: 16, q: "", a: "" },
        { id: 17, q: "", a: "" },
        { id: 18, q: "", a: "" },
        { id: 19, q: "", a: "" },
        { id: 20, q: "", a: "" },
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

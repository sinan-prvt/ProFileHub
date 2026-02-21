import { useState } from "react";

const InterviewPrep = () => {
    const [activeCategory, setActiveCategory] = useState("technical");
    const [openId, setOpenId] = useState(null);

    const categories = {
        technical: {
            label: "Technical",
            questions: [
                { id: "t1", q: "Explain the difference between Django's FBV and CBV.", a: "Function-Based Views (FBVs) are simple functions, good for simple logic. Class-Based Views (CBVs) use classes for better code reuse through inheritance, making them ideal for complex, shared logic." },
                { id: "t2", q: "What is the Django ORM and how does it work?", a: "Django ORM translates Python classes into database tables and Python expressions into SQL. It provides a lazy, chainable API for data operations." },
                { id: "t3", q: "How do you optimize a slow Django query?", a: "Strategies: 1) select_related() and prefetch_related() to reduce N+1 queries. 2) Database indexes. 3) Caching with Redis. 4) Profiling with Debug Toolbar." },
                { id: "t4", q: "Explain REST API design principles.", a: "Principles: Stateless requests, Resource-based URLs, Standard HTTP methods (GET, POST, etc.), and JSON formatted responses with proper status codes." },
                { id: "t5", q: "What is Docker and why use it?", a: "Docker packages apps into containers for consistency across environments. It eliminates 'works on my machine' issues and scales easily with orchestration." },
            ],
        },
        behavioral: {
            label: "Behavioral",
            questions: [
                { id: "b1", q: "Tell me about a challenging deadline.", a: "Use STAR: Describe a high-stakes project (Situation), your role (Task), how you prioritized and executed (Action), and the successful delivery/outcome (Result)." },
                { id: "b2", q: "How do you handle team disagreements?", a: "I listen actively, focus on technical merits, and suggest data-driven proof-of-concepts to reach the best objective solution for the project." },
                { id: "b3", q: "Describe a project you're proud of.", a: "Highlight a project demonstrating technical complexity and measurable impact (e.g., performance gains or error reduction) using the STAR method." },
            ],
        },
    };

    const current = categories[activeCategory];

    return (
        <section id="interview-prep">
            <div className="section-header-bento">
                <span className="section-tag-bento">Protocols</span>
                <h2 className="section-title-bento">Interview Mastery</h2>
            </div>

            <div className="interview-tabs" style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                {Object.entries(categories).map(([key, cat]) => (
                    <button
                        key={key}
                        className={`interview-tab ${activeCategory === key ? "interview-tab--active" : ""}`}
                        onClick={() => { setActiveCategory(key); setOpenId(null); }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: activeCategory === key ? 'var(--accent)' : 'var(--text-muted)',
                            fontSize: '0.8rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            padding: '8px 0',
                            borderBottom: activeCategory === key ? '2px solid var(--accent)' : '2px solid transparent',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="tech-list">
                {current.questions.map((item) => (
                    <div key={item.id} className="tech-item" style={{ padding: 0, overflow: 'hidden' }}>
                        <div
                            onClick={() => setOpenId(openId === item.id ? null : item.id)}
                            style={{
                                padding: '24px',
                                cursor: 'pointer',
                                background: openId === item.id ? 'rgba(255,255,255,0.03)' : 'transparent'
                            }}
                        >
                            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{item.q}</span>
                        </div>
                        {openId === item.id && (
                            <div style={{
                                padding: '24px',
                                borderTop: '1px solid var(--border)',
                                background: 'rgba(5, 5, 5, 0.4)',
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem',
                                lineHeight: '1.6'
                            }}>
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InterviewPrep;

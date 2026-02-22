import { useState } from "react";

const ChevronIcon = () => (
    <svg className="accordion-header__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 8 10 13 15 8" />
    </svg>
);

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
            <div className="section-header">
                <span className="section-tag">Preparation</span>
                <h2 className="section-title">Interview Q&A</h2>
            </div>

            <div className="tab-bar">
                {Object.entries(categories).map(([key, cat]) => (
                    <button
                        key={key}
                        className={`tab-btn ${activeCategory === key ? "tab-btn--active" : ""}`}
                        onClick={() => { setActiveCategory(key); setOpenId(null); }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="accordion-list">
                {current.questions.map((item) => (
                    <div
                        key={item.id}
                        className={`accordion-item ${openId === item.id ? "open" : ""}`}
                    >
                        <div
                            className="accordion-header"
                            onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        >
                            <div className="accordion-header__info">
                                <div className="accordion-header__title">{item.q}</div>
                            </div>
                            <ChevronIcon />
                        </div>
                        <div className="accordion-body">
                            <div className="accordion-body__inner">
                                <p className="accordion-body__content">{item.a}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InterviewPrep;

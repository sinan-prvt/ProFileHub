import { useState } from "react";
import { emailTemplates } from "../data/emailTemplatesData";

const ChevronIcon = () => (
    <svg className="accordion-header__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 8 10 13 15 8" />
    </svg>
);

const EmailTemplates = () => {
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const toggle = (id) => setOpenId(openId === id ? null : id);

    const categories = ["All", ...new Set(emailTemplates.map((t) => t.category))];

    const filtered =
        activeCategory === "All"
            ? emailTemplates
            : emailTemplates.filter((t) => t.category === activeCategory);

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
        <section id="email-templates">
            <div className="section-header">
                <span className="section-tag">Templates</span>
                <h2 className="section-title">Email & Messages</h2>
            </div>

            <div className="tab-bar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`tab-btn ${activeCategory === cat ? "tab-btn--active" : ""}`}
                        onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="accordion-list">
                {filtered.map((template) => (
                    <div
                        key={template.id}
                        className={`accordion-item ${openId === template.id ? "open" : ""}`}
                    >
                        <div className="accordion-header" onClick={() => toggle(template.id)}>
                            <div className="accordion-header__info">
                                <div className="accordion-header__title">{template.title}</div>
                                <div className="accordion-header__sub">{template.category}</div>
                            </div>
                            <button
                                className={`btn btn--copy ${copiedId === template.id ? "copied" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(template.content, template.id);
                                }}
                            >
                                {copiedId === template.id ? "✓ Copied" : "Copy"}
                            </button>
                            <ChevronIcon />
                        </div>
                        <div className="accordion-body">
                            <div className="accordion-body__inner">
                                <pre className="accordion-body__content">{template.content}</pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EmailTemplates;

import { useState } from "react";
import { salaryNegotiationData } from "../data/salaryNegotiationData";

const SalaryNegotiation = () => {
    const [copiedItem, setCopiedItem] = useState(null);
    const [activeTab, setActiveTab] = useState("rules");

    const copyText = async (text, id) => {
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
        setCopiedItem(id);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const tabs = [
        { key: "rules", label: "📌 Rules" },
        { key: "scripts", label: "💬 Scripts" },
        { key: "research", label: "🔍 Research" },
    ];

    return (
        <section id="salary">
            <div className="section-header">
                <span className="section-tag">Negotiation</span>
                <h2 className="section-title">Salary Playbook</h2>
            </div>

            <div className="tab-bar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`tab-btn ${activeTab === tab.key ? "tab-btn--active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Rules Tab */}
            {activeTab === "rules" && (
                <div className="stack stack--md">
                    {salaryNegotiationData.goldenRules.map((rule, i) => (
                        <div key={i} className="rule-card">
                            <div className="rule-card__number">{String(i + 1).padStart(2, "0")}</div>
                            <div>
                                <h3 className="rule-card__title">{rule.title}</h3>
                                <p className="rule-card__desc">{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Scripts Tab */}
            {activeTab === "scripts" && (
                <div className="stack stack--md">
                    {salaryNegotiationData.scripts.map((item) => (
                        <div key={item.id} className="callout-card">
                            <div className="callout-card__top">
                                <h3 className="callout-card__title">{item.title}</h3>
                                <button
                                    className={`btn btn--copy ${copiedItem === item.id ? "copied" : ""}`}
                                    onClick={() => copyText(item.script, item.id)}
                                >
                                    {copiedItem === item.id ? "✓ Copied" : "Copy"}
                                </button>
                            </div>
                            <p className="callout-card__text">{item.script}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Research Tab */}
            {activeTab === "research" && (
                <div className="stack stack--md">
                    {salaryNegotiationData.marketResearch.map((item, i) => (
                        <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card"
                        >
                            <div className="resource-card__info">
                                <h3 className="resource-card__title">{item.platform}</h3>
                                <p className="resource-card__use">{item.use}</p>
                            </div>
                            <span className="resource-card__arrow">→</span>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SalaryNegotiation;

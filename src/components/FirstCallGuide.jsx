import { useState } from "react";
import { firstCallGuideData } from "../data/firstCallGuideData";

const ChevronIcon = () => (
    <svg className="accordion-header__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 8 10 13 15 8" />
    </svg>
);

const FirstCallGuide = () => {
    const [openId, setOpenId] = useState(null);
    const [copiedItem, setCopiedItem] = useState(null);
    const [activeTab, setActiveTab] = useState("script");

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
        { key: "script", label: "📞 Script" },
        { key: "qa", label: "❓ Q&A" },
        { key: "tips", label: "✅ Do's & Don'ts" },
        { key: "checklist", label: "📋 Checklist" },
    ];

    return (
        <section id="first-call">
            <div className="section-header">
                <span className="section-tag">First Call</span>
                <h2 className="section-title">HR Call Guide</h2>
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

            {/* Script Tab */}
            {activeTab === "script" && (
                <div className="stack stack--md">
                    <div className="callout-card callout-card--accent">
                        <h3 className="callout-card__title">Opening Script</h3>
                        <p className="callout-card__text">{firstCallGuideData.intro.content}</p>
                        <button
                            className={`btn btn--copy ${copiedItem === "intro" ? "copied" : ""}`}
                            onClick={() => copyText(firstCallGuideData.intro.content, "intro")}
                            style={{ marginTop: '12px' }}
                        >
                            {copiedItem === "intro" ? "✓ Copied" : "Copy Script"}
                        </button>
                    </div>
                </div>
            )}

            {/* Q&A Tab */}
            {activeTab === "qa" && (
                <div className="accordion-list">
                    {firstCallGuideData.commonQuestions.map((item) => (
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
                                <button
                                    className={`btn btn--copy ${copiedItem === item.id ? "copied" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyText(item.a, item.id);
                                    }}
                                >
                                    {copiedItem === item.id ? "✓ Copied" : "Copy"}
                                </button>
                                <ChevronIcon />
                            </div>
                            <div className="accordion-body">
                                <div className="accordion-body__inner">
                                    <pre className="accordion-body__content">{item.a}</pre>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tips Tab */}
            {activeTab === "tips" && (
                <div className="stack stack--lg">
                    <div>
                        <h3 className="tips-heading tips-heading--do">✅ Do This</h3>
                        <div className="tips-list">
                            {firstCallGuideData.dos.map((tip, i) => (
                                <div key={i} className="tip-item tip-item--do">{tip}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="tips-heading tips-heading--dont">❌ Avoid This</h3>
                        <div className="tips-list">
                            {firstCallGuideData.donts.map((tip, i) => (
                                <div key={i} className="tip-item tip-item--dont">{tip}</div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Checklist Tab */}
            {activeTab === "checklist" && (
                <div className="checklist-list">
                    {firstCallGuideData.preCallChecklist.map((item, i) => (
                        <label key={i} className="checklist-item">
                            <input type="checkbox" className="checklist-item__check" />
                            <span className="checklist-item__text">{item}</span>
                        </label>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FirstCallGuide;

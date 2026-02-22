import { useState } from "react";
import { coverLetters } from "../data/coverLettersData";

const ChevronIcon = () => (
    <svg className="accordion-header__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 8 10 13 15 8" />
    </svg>
);

const CoverLetters = () => {
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const toggle = (id) => setOpenId(openId === id ? null : id);

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
        <section id="cover-letters">
            <div className="section-header">
                <span className="section-tag">Narrative</span>
                <h2 className="section-title">Cover Letters</h2>
            </div>

            <div className="accordion-list">
                {coverLetters.map((letter) => (
                    <div
                        key={letter.id}
                        className={`accordion-item ${openId === letter.id ? "open" : ""}`}
                    >
                        <div className="accordion-header" onClick={() => toggle(letter.id)}>
                            <div className="accordion-header__info">
                                <div className="accordion-header__title">{letter.title}</div>
                                <div className="accordion-header__sub">{letter.recipient}</div>
                            </div>
                            <button
                                className={`btn btn--copy ${copiedId === letter.id ? "copied" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(letter.content, letter.id);
                                }}
                            >
                                {copiedId === letter.id ? "✓ Copied" : "Copy"}
                            </button>
                            <ChevronIcon />
                        </div>
                        <div className="accordion-body">
                            <div className="accordion-body__inner">
                                <pre className="accordion-body__content">{letter.content}</pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoverLetters;

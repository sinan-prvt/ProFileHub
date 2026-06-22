import { useState } from "react";
import { coverLetters } from "../data/coverLettersData";
import PageHeader from "../components/PageHeader";

const CoverLettersPage = () => {
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

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
            <PageHeader title="Cover Letters" subtitle="Narrative" backTo="/" />

            <div className="crud-list">
                {coverLetters.length === 0 && <p className="empty-state">No cover letters available.</p>}
                {coverLetters.map((letter) => (
                    <div key={letter.id} className={`crud-card ${openId === letter.id ? "crud-card--open" : ""}`}>
                        <div className="crud-card__header" onClick={() => setOpenId(openId === letter.id ? null : letter.id)}>
                            <div className="crud-card__info">
                                <h3 className="crud-card__title">{letter.title}</h3>
                                {letter.recipient && <span className="crud-card__sub">{letter.recipient}</span>}
                            </div>
                            <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
                        </div>

                        {openId === letter.id && (
                            <div className="crud-card__body">
                                <pre className="crud-card__content">{letter.content}</pre>
                                <div className="crud-card__actions">
                                    <button className={`btn btn--copy ${copiedId === letter.id ? "copied" : ""}`} onClick={() => copyToClipboard(letter.content, letter.id)}>
                                        {copiedId === letter.id ? "✓ Copied" : "📋 Copy"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoverLettersPage;

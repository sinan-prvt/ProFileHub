import { useState } from "react";
import { pitches } from "../data/pitchesData";
import PageHeader from "../components/PageHeader";

const EmailsPage = () => {
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
            <PageHeader title="Why Hire Me?" subtitle="Interview Pitches" backTo="/" />

            <div className="crud-list">
                {pitches.length === 0 && <p className="empty-state">No pitches available.</p>}
                {pitches.map((pitch) => (
                    <div key={pitch.id} className={`crud-card ${openId === pitch.id ? "crud-card--open" : ""}`}>
                        <div className="crud-card__header" onClick={() => setOpenId(openId === pitch.id ? null : pitch.id)}>
                            <div className="crud-card__info">
                                <h3 className="crud-card__title">{pitch.title}</h3>
                            </div>
                            <svg className="crud-card__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="5 8 10 13 15 8" /></svg>
                        </div>

                        {openId === pitch.id && (
                            <div className="crud-card__body">
                                <pre className="crud-card__content">{pitch.content}</pre>
                                <div className="crud-card__actions">
                                    <button className={`btn btn--copy ${copiedId === pitch.id ? "copied" : ""}`} onClick={() => copyToClipboard(pitch.content, pitch.id)}>
                                        {copiedId === pitch.id ? "✓ Copied" : "📋 Copy"}
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

export default EmailsPage;

import { useState } from "react";
import { coverLetters } from "../data/coverLettersData";

const CoverLetters = () => {
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const toggle = (id) => setOpenId(openId === id ? null : id);

    const copyToClipboard = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    return (
        <section id="cover-letters">
            <div className="section-header-bento">
                <span className="section-tag-bento">Narrative</span>
                <h2 className="section-title-bento">Cover Protocols</h2>
            </div>

            <div className="tech-list">
                {coverLetters.map((letter) => (
                    <div key={letter.id} className="tech-item" style={{ padding: 0, overflow: 'hidden' }}>
                        <div
                            onClick={() => toggle(letter.id)}
                            style={{
                                padding: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: openId === letter.id ? 'rgba(255,255,255,0.03)' : 'transparent'
                            }}
                        >
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{letter.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{letter.recipient}</p>
                            </div>
                            <button
                                className="btn-tech"
                                style={{ padding: '6px 16px', fontSize: '0.7rem' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(letter.content, letter.id);
                                }}
                            >
                                {copiedId === letter.id ? "Success" : "Copy"}
                            </button>
                        </div>
                        {openId === letter.id && (
                            <div style={{
                                padding: '24px',
                                borderTop: '1px solid var(--border)',
                                background: 'rgba(5, 5, 5, 0.4)'
                            }}>
                                <pre style={{
                                    fontFamily: 'var(--font-body)',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    color: 'var(--text-muted)'
                                }}>
                                    {letter.content}
                                </pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoverLetters;

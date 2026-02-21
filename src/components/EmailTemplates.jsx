import { useState } from "react";
import { emailTemplates } from "../data/emailTemplatesData";

const EmailTemplates = () => {
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
        <section id="email-templates">
            <div className="section-header-bento">
                <span className="section-tag-bento">Correspondence</span>
                <h2 className="section-title-bento">Email Frameworks</h2>
            </div>

            <div className="tech-list">
                {emailTemplates.map((template) => (
                    <div key={template.id} className="tech-item" style={{ padding: 0, overflow: 'hidden' }}>
                        <div
                            onClick={() => toggle(template.id)}
                            style={{
                                padding: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: openId === template.id ? 'rgba(255,255,255,0.03)' : 'transparent'
                            }}
                        >
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{template.title}</h3>
                            <button
                                className="btn-tech"
                                style={{ padding: '6px 16px', fontSize: '0.7rem' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(template.content, template.id);
                                }}
                            >
                                {copiedId === template.id ? "Success" : "Copy"}
                            </button>
                        </div>
                        {openId === template.id && (
                            <div style={{
                                padding: '24px',
                                borderTop: '1px solid var(--border)',
                                background: 'rgba(5, 5, 5, 0.4)'
                            }}>
                                <pre style={{
                                    fontFamily: 'monospace',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    color: 'var(--text-muted)'
                                }}>
                                    {template.content}
                                </pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EmailTemplates;

import { useState } from "react";
import { resumeData } from "../data/resumeData";

const Contact = () => {
    const [copiedField, setCopiedField] = useState(null);

    const copyText = async (text, field) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        }
    };

    const { contact } = resumeData;

    const contactItems = [
        { id: "email", label: "Email", value: contact.email, href: `mailto:${contact.email}`, copyable: true },
        { id: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone}`, copyable: true },
        { id: "linkedin", label: "LinkedIn", value: "LinkedIn Profile", href: contact.linkedin, external: true },
        { id: "github", label: "GitHub", value: "GitHub Repository", href: contact.github, external: true },
    ];

    return (
        <section id="contact">
            <div className="section-header-bento">
                <span className="section-tag-bento">Connection</span>
                <h2 className="section-title-bento">Technical Outreach</h2>
            </div>

            <div className="tech-list">
                {contactItems.map((item) => (
                    <div key={item.id} className="tech-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>{item.label}</span>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', textDecoration: 'none' }}
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>{item.value}</span>
                            )}
                        </div>
                        {item.copyable && (
                            <button
                                className="btn-tech"
                                style={{ padding: '8px 20px', fontSize: '0.75rem' }}
                                onClick={() => copyText(item.value, item.id)}
                            >
                                {copiedField === item.id ? "Success" : "Copy"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Contact;

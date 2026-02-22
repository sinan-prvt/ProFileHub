import { useState } from "react";
import { resumeData } from "../data/resumeData";
import PageHeader from "../components/PageHeader";

const ContactPage = () => {
    const [copiedField, setCopiedField] = useState(null);

    const copyText = async (text, field) => {
        try { await navigator.clipboard.writeText(text); } catch {
            const ta = document.createElement("textarea"); ta.value = text;
            document.body.appendChild(ta); ta.select(); document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const { contact } = resumeData;
    const contactItems = [
        { id: "email", label: "Email", value: contact.email, href: `mailto:${contact.email}`, copyable: true },
        { id: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone}`, copyable: true },
        { id: "linkedin", label: "LinkedIn", value: "View Profile →", href: contact.linkedin, external: true, copyable: true, copyVal: contact.linkedin },
        { id: "github", label: "GitHub", value: "View Repos →", href: contact.github, external: true, copyable: true, copyVal: contact.github },
        { id: "portfolio", label: "Portfolio", value: "Visit Site →", href: contact.portfolio, external: true, copyable: true, copyVal: contact.portfolio },
        { id: "location", label: "Location", value: contact.location },
    ];

    return (
        <div className="page">
            <PageHeader title="Quick Contacts" subtitle="Connect" backTo="/" />

            <div className="crud-list">
                {contactItems.map((item) => (
                    <div key={item.id} className="contact-card">
                        <div className="contact-card__info">
                            <div className="contact-card__label">{item.label}</div>
                            {item.href ? (
                                <a href={item.href} target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined} className="contact-card__value">
                                    {item.value}
                                </a>
                            ) : (
                                <span className="contact-card__value">{item.value}</span>
                            )}
                        </div>
                        {item.copyable && (
                            <button className={`btn btn--copy ${copiedField === item.id ? "copied" : ""}`}
                                onClick={() => copyText(item.copyVal || item.value, item.id)}>
                                {copiedField === item.id ? "✓ Copied" : "📋 Copy"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactPage;

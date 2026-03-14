const icons = {
    home: (
        <path d="M3 9.5L10 4l7 5.5V17a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V9.5z" />
    ),
    resume: (
        <>
            <rect x="4" y="3" width="12" height="14" rx="2" />
            <line x1="7" y1="7" x2="13" y2="7" />
            <line x1="7" y1="10" x2="13" y2="10" />
            <line x1="7" y1="13" x2="11" y2="13" />
        </>
    ),
    letters: (
        <>
            <path d="M4 4h12v12H4z" />
            <path d="M4 6l6 4 6-4" />
        </>
    ),
    emails: (
        <>
            <rect x="3" y="5" width="14" height="10" rx="2" />
            <path d="M3 7l7 4 7-4" />
        </>
    ),
    whatsapp: (
        <>
            <path d="M10 3a7 7 0 0 0-6 10.7L3 17l3.5-1A7 7 0 1 0 10 3z" />
            <path d="M7.5 8.5c.5 1.5 1.6 2.6 3.1 3.1" />
        </>
    ),
    checklist: (
        <>
            <rect x="4" y="3" width="12" height="14" rx="2" />
            <path d="M7 8l1.5 1.5L11 7" />
            <line x1="7" y1="12" x2="13" y2="12" />
        </>
    ),
    backup: (
        <>
            <path d="M6 15a4 4 0 0 1 .2-8A5 5 0 0 1 16 8a3 3 0 0 1 0 6H6z" />
            <path d="M10 8v6" />
            <path d="M8 12l2 2 2-2" />
        </>
    ),
    call: (
        <path d="M6 3h3l1 4-2 1a11 11 0 0 0 4 4l1-2 4 1v3a2 2 0 0 1-2 2A13 13 0 0 1 4 5a2 2 0 0 1 2-2z" />
    ),
    interview: (
        <>
            <circle cx="10" cy="10" r="7" />
            <circle cx="10" cy="10" r="2" />
            <path d="M10 3v2M17 10h-2M10 17v-2M3 10h2" />
        </>
    ),
    workflow: (
        <>
            <path d="M4 6h9" />
            <path d="M10 3l3 3-3 3" />
            <path d="M16 14H7" />
            <path d="M10 11l-3 3 3 3" />
        </>
    ),
    salary: (
        <>
            <circle cx="10" cy="10" r="7" />
            <path d="M10 6v8" />
            <path d="M12.5 7.5c-.6-.9-3.5-.9-3.5.5s3.5 1.2 3.5 2.8-2.9 1.4-3.5.5" />
        </>
    ),
    contact: (
        <>
            <rect x="4" y="4" width="12" height="12" rx="2" />
            <circle cx="10" cy="9" r="2" />
            <path d="M7 13c1-1 5-1 6 0" />
        </>
    ),
    settings: (
        <>
            <circle cx="10" cy="10" r="2.2" />
            <path d="M10 4.5v1.3M10 14.2v1.3M4.5 10h1.3M14.2 10h1.3" />
            <path d="M6.1 6.1l.9.9M13 13l.9.9M13.9 6.1l-.9.9M7 13l-.9.9" />
        </>
    ),
    more: (
        <path d="M5 10h.01M10 10h.01M15 10h.01" />
    ),
    linkedin: (
        <>
            <rect x="3" y="3" width="14" height="14" rx="2" />
            <path d="M7 9v6" />
            <circle cx="7" cy="6.5" r=".8" fill="currentColor" stroke="none" />
            <path d="M11 9v6" />
            <path d="M11 12a2.5 2.5 0 0 1 5 0v3" />
        </>
    ),
};

const AppIcon = ({ name, className = "" }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {icons[name] || icons.more}
    </svg>
);

export default AppIcon;

const Workflow = () => {
    const steps = [
        { id: 1, title: "Discovery", description: "In-depth research of target objectives and company ecosystem." },
        { id: 2, title: "Precision Tailoring", description: "Strategic alignment of technical assets with specific requirements." },
        { id: 3, title: "Deployment", description: "Submission and proactive engagement with stakeholder networks." },
        { id: 4, title: "Technical Dialogue", description: "Rigorous preparation for architectural and behavioral evaluations." },
        { id: 5, title: "Execution", description: "High-impact performance during the engagement lifecycle." },
        { id: 6, title: "Finalization", description: "Negotiation and strategic alignment of professional terms." },
    ];

    return (
        <section id="workflow">
            <div className="section-header-bento">
                <span className="section-tag-bento">Strategy</span>
                <h2 className="section-title-bento">Application Workflow</h2>
            </div>

            <div className="tech-list">
                {steps.map((step) => (
                    <div key={step.id} className="tech-item" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: 'var(--accent)',
                            opacity: 0.3,
                            fontFamily: 'var(--font-display)'
                        }}>
                            {String(step.id).padStart(2, "0")}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Workflow;

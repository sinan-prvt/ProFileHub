import { resumeData } from "../data/resumeData";

const Resume = () => {
    return (
        <section id="resume">
            <div className="section-header-bento">
                <span className="section-tag-bento">Core Architecture</span>
                <h2 className="section-title-bento">Professional Protocol</h2>
            </div>

            {/* Experience */}
            <div className="tech-list m-bento">
                {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="tech-item">
                        <div className="experience-item__header">
                            <div>
                                <h3 className="text-gradient-tech" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{exp.role}</h3>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{exp.company}</span>
                            </div>
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold' }}>{exp.period}</span>
                        </div>
                        <ul className="experience-item__details" style={{ marginTop: '16px', listStyle: 'none', padding: 0 }}>
                            {exp.highlights.map((h, i) => (
                                <li key={i} style={{ marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.95rem', paddingLeft: '20px', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>›</span>
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Skills (Internal Bento) */}
            <div className="section-header-bento" style={{ marginTop: '64px' }}>
                <span className="section-tag-bento">Neural Stack</span>
                <h2 className="section-title-bento">Technical Capabilities</h2>
            </div>
            <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {resumeData.skills.map((group) => (
                    <div key={group.category} className="tech-item" style={{ padding: '20px' }}>
                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', color: 'var(--accent)' }}>{group.category}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {group.items.map((skill) => (
                                <span key={skill} style={{ fontSize: '0.85rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px' }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Resume;

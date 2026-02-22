import { resumeData } from "../data/resumeData";

const Resume = () => {
    return (
        <section id="resume">
            {/* Experience */}
            <div className="section-header">
                <span className="section-tag">Experience</span>
                <h2 className="section-title">Professional Journey</h2>
            </div>

            <div className="stack stack--md">
                {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="exp-card">
                        <div className="exp-card__header">
                            <div>
                                <h3 className="exp-card__role text-gradient">{exp.role}</h3>
                                <span className="exp-card__company">{exp.company} — {exp.location}</span>
                            </div>
                            <span className="exp-card__period">{exp.period}</span>
                        </div>
                        <ul className="exp-card__highlights">
                            {exp.highlights.map((h, i) => (
                                <li key={i} className="exp-card__highlight">{h}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Projects */}
            <div className="section-header" style={{ marginTop: '40px' }}>
                <span className="section-tag">Projects</span>
                <h2 className="section-title">Key Projects</h2>
            </div>

            <div className="stack stack--md stack--projects">
                {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="project-card">
                        <h3 className="project-card__title text-gradient">{proj.title}</h3>
                        <p className="project-card__subtitle">{proj.subtitle}</p>
                        <ul className="project-card__highlights">
                            {proj.highlights.map((h, i) => (
                                <li key={i} className="project-card__highlight">{h}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="skills-section">
                <div className="section-header">
                    <span className="section-tag">Stack</span>
                    <h2 className="section-title">Technical Skills</h2>
                </div>
                <div className="skills-grid">
                    {resumeData.skills.map((group) => (
                        <div key={group.category} className="skill-group">
                            <h4 className="skill-group__title">{group.category}</h4>
                            <div className="skill-chips">
                                {group.items.map((skill) => (
                                    <span key={skill} className="skill-chip">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="section-header" style={{ marginTop: '40px' }}>
                <span className="section-tag">Education</span>
                <h2 className="section-title">Academic Background</h2>
            </div>
            <div className="stack stack--md">
                {resumeData.education.map((edu) => (
                    <div key={edu.id} className="edu-item">
                        <span className="edu-item__degree">{edu.degree}</span>
                        <span className="edu-item__institution">{edu.institution}</span>
                        <span className="edu-item__period">{edu.period}</span>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div className="section-header" style={{ marginTop: '40px' }}>
                <span className="section-tag">Certifications</span>
                <h2 className="section-title">Credentials</h2>
            </div>
            <div className="stack stack--sm">
                {resumeData.certifications.map((cert, i) => (
                    <div key={i} className="cert-item">{cert}</div>
                ))}
            </div>
        </section>
    );
};

export default Resume;

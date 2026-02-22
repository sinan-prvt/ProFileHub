import { Link } from "react-router-dom";
import { resumeData } from "../data/resumeData";

const sections = [
    { to: "/resume", icon: "📋", title: "Resume", desc: "View & download your resume" },
    { to: "/cover-letters", icon: "📝", title: "Cover Letters", desc: "Store & copy cover letters" },
    { to: "/emails", icon: "✉️", title: "Email Templates", desc: "Application, follow-up & networking" },
    { to: "/first-call", icon: "📞", title: "First Call Guide", desc: "Scripts, tips & checklists" },
    { to: "/interview", icon: "🎯", title: "Interview Prep", desc: "Technical & behavioral Q&A" },
    { to: "/workflow", icon: "🔄", title: "Workflow", desc: "Step-by-step & research checklist" },
    { to: "/salary", icon: "💰", title: "Salary Negotiation", desc: "Rules, scripts & market data" },
    { to: "/contact", icon: "📇", title: "Quick Contacts", desc: "Copy your contact info fast" },
];

const HomePage = () => {
    return (
        <div className="page page--home">
            <div className="hero">
                <span className="hero__badge">Open to Work</span>
                <h1 className="hero__name">{resumeData.name}</h1>
                <p className="hero__role">{resumeData.title}</p>
                <p className="hero__bio">
                    Your personal toolkit to organize cover letters, email templates, interview prep, and more — all in one place.
                </p>
                <div className="hero__actions">
                    <a href={resumeData.resumeUrl} className="btn btn--primary" download>
                        Download Resume
                    </a>
                    <Link to="/resume" className="btn btn--secondary">
                        View Profile
                    </Link>
                </div>
            </div>

            <div className="home-grid">
                {sections.map((s) => (
                    <Link key={s.to} to={s.to} className="home-card">
                        <span className="home-card__icon">{s.icon}</span>
                        <div className="home-card__content">
                            <h3 className="home-card__title">{s.title}</h3>
                            <p className="home-card__desc">{s.desc}</p>
                        </div>
                        <span className="home-card__arrow">→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

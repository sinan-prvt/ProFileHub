import { Link } from "react-router-dom";
import { resumeData } from "../data/resumeData";
import AppIcon from "../components/AppIcon";

const sections = [
    { to: "/resume", icon: "resume", title: "Resume", desc: "View & download your resume" },
    { to: "/cover-letters", icon: "letters", title: "Cover Letters", desc: "Store & copy cover letters" },
    { to: "/emails", icon: "emails", title: "Email Templates", desc: "Application, follow-up & networking" },
    { to: "/whatsapp", icon: "whatsapp", title: "WhatsApp Messages", desc: "Separate WhatsApp outreach templates" },
    { to: "/daily-checklist", icon: "checklist", title: "Daily Checklist", desc: "Track portal applications every day" },
    { to: "/first-call", icon: "call", title: "First Call Guide", desc: "Scripts, tips & checklists" },
    { to: "/interview", icon: "interview", title: "Interview Prep", desc: "Technical & behavioral Q&A" },
    { to: "/workflow", icon: "workflow", title: "Workflow", desc: "Step-by-step & research checklist" },
    { to: "/salary", icon: "salary", title: "Salary Negotiation", desc: "Rules, scripts & market data" },
    { to: "/contact", icon: "contact", title: "Quick Contacts", desc: "Copy your contact info fast" },
];

const moreOptions = [
    { to: "/more", icon: "more", title: "More Options", desc: "Open all extra tools and pages" },
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
                        <span className="home-card__icon"><AppIcon name={s.icon} className="home-card__icon-svg" /></span>
                        <div className="home-card__content">
                            <h3 className="home-card__title">{s.title}</h3>
                            <p className="home-card__desc">{s.desc}</p>
                        </div>
                        <span className="home-card__arrow">→</span>
                    </Link>
                ))}
            </div>

            <div className="home-more">
                <p className="home-more__title">More Options</p>
                <div className="home-grid home-grid--single">
                    {moreOptions.map((s) => (
                        <Link key={s.to} to={s.to} className="home-card">
                            <span className="home-card__icon"><AppIcon name={s.icon} className="home-card__icon-svg" /></span>
                            <div className="home-card__content">
                                <h3 className="home-card__title">{s.title}</h3>
                                <p className="home-card__desc">{s.desc}</p>
                            </div>
                            <span className="home-card__arrow">→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

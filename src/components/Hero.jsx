import { resumeData } from "../data/resumeData";

const Hero = () => {
    return (
        <header id="hero" className="hero">
            <div className="hero__badge">
                <span className="pulse-dot"></span>
                Job Cracking Command Center
            </div>

            <h1 className="hero__name text-gradient">
                {resumeData.name}
            </h1>

            <p className="hero__subtitle">
                Your personal toolkit to crack any job — scripts, templates, checklists & strategies all in one place.
            </p>

            <div className="hero__actions">
                <a href={resumeData.resumeUrl} className="btn btn--primary" download>
                    ↓ Download Resume
                </a>
                <a href="#first-call" className="btn btn--ghost">
                    📞 First Call Guide
                </a>
            </div>

            <div className="hero__scroll-hint">
                <span></span>
            </div>
        </header>
    );
};

export default Hero;

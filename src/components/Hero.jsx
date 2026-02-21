import { resumeData } from "../data/resumeData";

const Hero = () => {
    return (
        <header id="hero" className="hero-tech">
            <div className="hero-tech__badge">
                <span className="pulse-dot"></span>
                Software Engineer • Full Stack Lead
            </div>

            <h1 className="hero-tech__name text-gradient-tech">
                {resumeData.name}
            </h1>

            <p className="hero-tech__title">
                Crafting High-Performance Technical Solutions
            </p>

            <div className="hero-tech__actions">
                <a href="#contact" className="btn-tech">
                    Connect Now
                </a>
            </div>
        </header>
    );
};

export default Hero;

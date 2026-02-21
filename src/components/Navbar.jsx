import { useState, useEffect } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#hero", label: "Studio" },
        { href: "#resume", label: "Experience" },
        { href: "#workflow", label: "Strategy" },
        { href: "#contact", label: "Connection" },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar__container">
                <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, "#hero")}>
                    SINAN.DEV
                </a>

                <div className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="navbar__link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="navbar__actions">
                    <button
                        className={`navbar__hamburger ${isOpen ? "navbar__hamburger--open" : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

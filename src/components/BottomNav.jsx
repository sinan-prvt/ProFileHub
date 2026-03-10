import { NavLink } from "react-router-dom";
import AppIcon from "./AppIcon";

const navItems = [
    { to: "/", icon: "home", label: "Home" },
    { to: "/cover-letters", icon: "letters", label: "Letters" },
    { to: "/emails", icon: "emails", label: "Emails" },
    { to: "/first-call", icon: "call", label: "Calls" },
    { to: "/interview", icon: "interview", label: "Interview" },
    { to: "/more", icon: "more", label: "More" },
];

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
                    }
                    end={item.to === "/"}
                >
                    <span className="bottom-nav__icon"><AppIcon name={item.icon} className="bottom-nav__icon-svg" /></span>
                    <span className="bottom-nav__label">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;

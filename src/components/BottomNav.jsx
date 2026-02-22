import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/", icon: "🏠", label: "Home" },
    { to: "/cover-letters", icon: "📝", label: "Letters" },
    { to: "/emails", icon: "✉️", label: "Emails" },
    { to: "/first-call", icon: "📞", label: "Calls" },
    { to: "/interview", icon: "🎯", label: "Interview" },
    { to: "/more", icon: "⋯", label: "More" },
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
                    <span className="bottom-nav__icon">{item.icon}</span>
                    <span className="bottom-nav__label">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;

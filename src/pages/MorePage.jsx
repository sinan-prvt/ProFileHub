import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const moreItems = [
    { to: "/resume", icon: "📋", title: "Resume", desc: "View & download" },
    { to: "/workflow", icon: "🔄", title: "Workflow", desc: "Application strategy" },
    { to: "/salary", icon: "💰", title: "Salary Negotiation", desc: "Rules, scripts & data" },
    { to: "/contact", icon: "📇", title: "Quick Contacts", desc: "Copy your info" },
];

const MorePage = () => {
    return (
        <div className="page">
            <PageHeader title="More" subtitle="Navigation" />

            <div className="crud-list">
                {moreItems.map((item) => (
                    <Link key={item.to} to={item.to} className="home-card">
                        <span className="home-card__icon">{item.icon}</span>
                        <div className="home-card__info">
                            <h3 className="home-card__title">{item.title}</h3>
                            <p className="home-card__desc">{item.desc}</p>
                        </div>
                        <span className="home-card__arrow">→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MorePage;

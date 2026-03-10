import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import AppIcon from "../components/AppIcon";

const moreItems = [
    { to: "/settings", icon: "settings", title: "Settings", desc: "Project configuration and controls" },
    { to: "/data-backup", icon: "backup", title: "Data Backup", desc: "Export and restore full local data" },
];

const MorePage = () => {
    return (
        <div className="page">
            <PageHeader title="More" subtitle="Navigation" backTo="/" />

            <div className="crud-list">
                {moreItems.map((item) => (
                    <Link key={item.to} to={item.to} className="home-card">
                        <span className="home-card__icon"><AppIcon name={item.icon} className="home-card__icon-svg" /></span>
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

import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const SettingsPage = () => {
    const cloudEndpoint = import.meta.env.VITE_STORAGE_API_BASE || "/.netlify/functions/storage";
    const cloudSyncEnabled =
        import.meta.env.VITE_ENABLE_CLOUD_SYNC === "true" ||
        (import.meta.env.PROD && import.meta.env.VITE_ENABLE_CLOUD_SYNC !== "false");

    const clearLocalData = () => {
        const ok = window.confirm("This will clear all local app data in this browser. Continue?");
        if (!ok) return;

        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="page">
            <PageHeader title="Settings" subtitle="Project" backTo="/more" />

            <div className="crud-list">
                <div className="callout-card">
                    <h3 className="callout-card__title">Project Info</h3>
                    <p className="callout-card__text">App: ProFileHub</p>
                    <p className="callout-card__text">Environment: {import.meta.env.PROD ? "Production" : "Development"}</p>
                    <p className="callout-card__text">Cloud Sync: {cloudSyncEnabled ? "Enabled" : "Disabled"}</p>
                </div>

                <div className="callout-card">
                    <h3 className="callout-card__title">Cloud Endpoint</h3>
                    <p className="callout-card__text" style={{ wordBreak: "break-all" }}>{cloudEndpoint}</p>
                    <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                        <a className="btn btn--ghost btn--sm" href={cloudEndpoint} target="_blank" rel="noreferrer">Open Endpoint</a>
                        <Link className="btn btn--secondary btn--sm" to="/data-backup">Go to Data Backup</Link>
                    </div>
                </div>

                <div className="callout-card">
                    <h3 className="callout-card__title">Data Controls</h3>
                    <p className="callout-card__text">Use with caution. This affects only this browser.</p>
                    <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                        <button className="btn btn--danger btn--sm" onClick={clearLocalData}>Clear Local Data</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

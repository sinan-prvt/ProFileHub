import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";

const DataBackupPage = () => {
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);
    const [cloudStatus, setCloudStatus] = useState("checking");
    const fileInputRef = useRef(null);
    const cloudEndpoint = import.meta.env.VITE_STORAGE_API_BASE || "/.netlify/functions/storage";
    const autoSyncEnabled =
        import.meta.env.VITE_ENABLE_CLOUD_SYNC === "true" ||
        (import.meta.env.PROD && import.meta.env.VITE_ENABLE_CLOUD_SYNC !== "false");

    const checkCloudConnection = async () => {
        setCloudStatus("checking");
        try {
            const response = await fetch(cloudEndpoint);
            if (!response.ok) throw new Error("Cloud unavailable");
            await response.json();
            setCloudStatus("connected");
        } catch {
            setCloudStatus("disconnected");
        }
    };

    useEffect(() => {
        checkCloudConnection();
    }, []);

    const exportData = () => {
        const allKeys = Object.keys(localStorage);
        const payload = {};

        allKeys.forEach((key) => {
            payload[key] = localStorage.getItem(key);
        });

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `job-app-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);

        setMessage("Backup exported successfully.");
    };

    const restoreData = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const payload = JSON.parse(text);

            if (!payload || typeof payload !== "object") {
                setMessage("Invalid backup file.");
                return;
            }

            Object.entries(payload).forEach(([key, value]) => {
                if (typeof value === "string") {
                    localStorage.setItem(key, value);
                }
            });

            setMessage("Backup restored. Reload the page to see updated data.");
        } catch {
            setMessage("Could not restore file. Please use a valid JSON backup.");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const uploadLocalToCloud = async () => {
        setBusy(true);
        try {
            const entries = Object.keys(localStorage).map((key) => {
                const raw = localStorage.getItem(key);
                try {
                    return { key, value: JSON.parse(raw) };
                } catch {
                    return { key, value: raw };
                }
            });

            const response = await fetch(cloudEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ entries }),
            });

            if (!response.ok) throw new Error("Upload failed");
            setMessage("Local data uploaded to cloud storage.");
        } catch {
            setMessage("Could not upload to cloud. Ensure Netlify Blobs is available on this deployed site.");
        } finally {
            setBusy(false);
        }
    };

    const downloadCloudToLocal = async () => {
        setBusy(true);
        try {
            const response = await fetch(cloudEndpoint);
            if (!response.ok) throw new Error("Download failed");

            const payload = await response.json();
            const values = payload?.values;
            if (!values || typeof values !== "object") {
                setMessage("Cloud storage is empty.");
                return;
            }

            Object.entries(values).forEach(([key, value]) => {
                localStorage.setItem(key, JSON.stringify(value));
            });

            setMessage("Cloud data restored to local storage. Reload the page.");
        } catch {
            setMessage("Could not restore from cloud. Ensure Netlify Blobs is available on this deployed site.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="page">
            <PageHeader title="Data Backup" subtitle="Storage" backTo="/more" />

            <div className="crud-list">
                <div className="callout-card">
                    <h3 className="callout-card__title">Export Full Local Data</h3>
                    <p className="callout-card__text">Download all browser-stored data as a JSON file.</p>
                    <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                        <button className="btn btn--primary btn--sm" onClick={exportData}>Export Backup</button>
                    </div>
                </div>

                <div className="callout-card">
                    <h3 className="callout-card__title">Import / Restore</h3>
                    <p className="callout-card__text">Restore data from a previously exported backup file.</p>
                    <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                        <input
                            ref={fileInputRef}
                            className="form__input"
                            type="file"
                            accept="application/json"
                            onChange={restoreData}
                        />
                    </div>
                </div>

                <div className="callout-card">
                    <h3 className="callout-card__title">Cloud Sync (Netlify)</h3>
                    <p className="callout-card__text">Push your full local storage to cloud, or pull cloud data back to this browser.</p>
                    <p className="callout-card__text">
                        Auto Sync: {autoSyncEnabled ? "ON" : "OFF"} | Connection: {
                            cloudStatus === "connected"
                                ? "Connected"
                                : cloudStatus === "disconnected"
                                    ? "Disconnected"
                                    : "Checking..."
                        }
                    </p>
                    <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                        <button className="btn btn--primary btn--sm" onClick={uploadLocalToCloud} disabled={busy}>Upload Local to Cloud</button>
                        <button className="btn btn--secondary btn--sm" onClick={downloadCloudToLocal} disabled={busy}>Restore Cloud to Local</button>
                        <button className="btn btn--ghost btn--sm" onClick={checkCloudConnection} disabled={busy}>Check Connection</button>
                    </div>
                </div>

                {message && <p className="empty-state">{message}</p>}
            </div>
        </div>
    );
};

export default DataBackupPage;

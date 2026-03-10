import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
    const cloudSyncEnabled =
        import.meta.env.VITE_ENABLE_CLOUD_SYNC === "true" ||
        (import.meta.env.PROD && import.meta.env.VITE_ENABLE_CLOUD_SYNC !== "false");
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    });
    const [cloudHydrated, setCloudHydrated] = useState(!cloudSyncEnabled);
    const cloudEndpoint = import.meta.env.VITE_STORAGE_API_BASE || "/.netlify/functions/storage";

    useEffect(() => {
        if (!cloudSyncEnabled) return;

        let cancelled = false;

        const hydrateFromCloud = async () => {
            try {
                const response = await fetch(`${cloudEndpoint}?key=${encodeURIComponent(key)}`);
                if (!response.ok) return;

                const payload = await response.json();
                if (!cancelled && payload?.found) {
                    setValue(payload.value);
                }
            } catch {
                // Ignore cloud errors and keep local fallback.
            } finally {
                if (!cancelled) setCloudHydrated(true);
            }
        };

        hydrateFromCloud();

        return () => {
            cancelled = true;
        };
    }, [key, cloudSyncEnabled, cloudEndpoint]);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or unavailable
        }
    }, [key, value]);

    useEffect(() => {
        if (!cloudSyncEnabled || !cloudHydrated) return;

        const pushToCloud = async () => {
            try {
                await fetch(cloudEndpoint, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ key, value }),
                });
            } catch {
                // Ignore cloud sync errors and keep local data.
            }
        };

        pushToCloud();
    }, [key, value, cloudSyncEnabled, cloudHydrated, cloudEndpoint]);

    const addItem = (item) => {
        setValue((prev) => [...prev, { ...item, id: Date.now() }]);
    };

    const updateItem = (id, updates) => {
        setValue((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    const deleteItem = (id) => {
        setValue((prev) => prev.filter((item) => item.id !== id));
    };

    return { data: value, setData: setValue, addItem, updateItem, deleteItem };
}

import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or unavailable
        }
    }, [key, value]);

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

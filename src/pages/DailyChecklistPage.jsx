import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { defaultDailyPortals } from "../data/dailyChecklistData";

const createDefaultItems = () =>
    defaultDailyPortals.map((label, index) => ({
        id: index + 1,
        label,
        checked: false,
    }));

const todayKey = () => new Date().toISOString().slice(0, 10);

const DailyChecklistPage = () => {
    const { data, setData } = useLocalStorage("dailyChecklist_v1", {
        date: todayKey(),
        items: createDefaultItems(),
    });

    useEffect(() => {
        setData((prev) => {
            const currentDate = todayKey();
            const safePrev = prev && typeof prev === "object" ? prev : { date: currentDate, items: createDefaultItems() };
            const baseItems = Array.isArray(safePrev.items) ? safePrev.items : createDefaultItems();

            // New day starts with all unchecked while preserving any custom entries.
            if (safePrev.date !== currentDate) {
                return {
                    date: currentDate,
                    items: baseItems.map((item) => ({ ...item, checked: false })),
                };
            }

            return safePrev;
        });
    }, [setData]);

    const items = Array.isArray(data?.items) ? data.items : [];
    const checkedCount = items.filter((item) => item.checked).length;

    const toggleItem = (id) => {
        setData((prev) => ({
            ...prev,
            items: (prev.items || []).map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ),
        }));
    };

    const markAll = () => {
        setData((prev) => ({
            ...prev,
            items: (prev.items || []).map((item) => ({ ...item, checked: true })),
        }));
    };

    const clearAll = () => {
        setData((prev) => ({
            ...prev,
            items: (prev.items || []).map((item) => ({ ...item, checked: false })),
        }));
    };

    return (
        <div className="page">
            <PageHeader title="Daily Checklist" subtitle="Applications" backTo="/" />

            <div className="callout-card" style={{ marginBottom: "12px" }}>
                <p className="callout-card__text">Date: {data?.date || todayKey()}</p>
                <p className="callout-card__text">Completed: {checkedCount}/{items.length}</p>
                <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                    <button className="btn btn--secondary btn--sm" onClick={markAll}>Mark All</button>
                    <button className="btn btn--ghost btn--sm" onClick={clearAll}>Reset Today</button>
                </div>
            </div>

            <div className="checklist-list">
                {items.map((item) => (
                    <label key={item.id} className="checklist-item" onClick={() => toggleItem(item.id)}>
                        <input
                            type="checkbox"
                            className="checklist-item__check"
                            checked={item.checked}
                            onChange={() => toggleItem(item.id)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checklist-item__text">{item.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default DailyChecklistPage;

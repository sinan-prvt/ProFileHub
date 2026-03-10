import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { defaultDailyPortals } from "../data/dailyChecklistData";

const createDefaultItems = () =>
    defaultDailyPortals.map((label, index) => ({
        id: index + 1,
        label,
        checked: false,
    }));

const formatLocalDate = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

const parseIsoLocalDate = (isoDate) => {
    const [y, m, d] = (isoDate || "").split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
};

const getDateParts = (isoDate) => {
    const dt = parseIsoLocalDate(isoDate) || new Date();
    return {
        day: String(dt.getDate()).padStart(2, "0"),
        month: String(dt.getMonth() + 1).padStart(2, "0"),
        year: String(dt.getFullYear()),
    };
};

const formatDisplayDate = (isoDate) => {
    const dt = parseIsoLocalDate(isoDate);
    if (!dt) return isoDate;
    const day = String(dt.getDate()).padStart(2, "0");
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const year = dt.getFullYear();
    return `${day}/${month}/${year}`;
};

const todayKey = () => formatLocalDate(new Date());

const shiftIsoDate = (isoDate, offsetDays) => {
    const dt = parseIsoLocalDate(isoDate) || new Date();
    dt.setDate(dt.getDate() + offsetDays);
    return formatLocalDate(dt);
};

const cloneDefaultItems = () =>
    createDefaultItems().map((item) => ({ ...item }));

const DailyChecklistPage = () => {
    const { data, setData } = useLocalStorage("dailyChecklist_v2", {
        activeDate: todayKey(),
        entries: {
            [todayKey()]: cloneDefaultItems(),
        },
    });

    useEffect(() => {
        setData((prev) => {
            const currentDate = todayKey();

            // Migrate old shape: { date, items } -> { activeDate, entries }
            if (prev && typeof prev === "object" && "date" in prev && "items" in prev) {
                const oldDate = prev.date || currentDate;
                const oldItems = Array.isArray(prev.items) ? prev.items : cloneDefaultItems();

                return {
                    activeDate: currentDate,
                    entries: {
                        [oldDate]: oldItems,
                        [currentDate]: oldDate === currentDate ? oldItems : cloneDefaultItems(),
                    },
                };
            }

            const safePrev = prev && typeof prev === "object" ? prev : {};
            const entries = safePrev.entries && typeof safePrev.entries === "object" ? { ...safePrev.entries } : {};
            const activeDate = typeof safePrev.activeDate === "string" ? safePrev.activeDate : currentDate;

            if (!entries[currentDate]) {
                entries[currentDate] = cloneDefaultItems();
            }

            if (!entries[activeDate]) {
                entries[activeDate] = cloneDefaultItems();
            }

            return { activeDate, entries };
        });
    }, [setData]);

    const activeDate = data?.activeDate || todayKey();
    const { day, month, year } = getDateParts(activeDate);
    const entries = data?.entries && typeof data.entries === "object" ? data.entries : {};
    const items = Array.isArray(entries[activeDate]) ? entries[activeDate] : [];
    const checkedCount = items.filter((item) => item.checked).length;
    const [newItemText, setNewItemText] = useState("");

    const setActiveDate = (date) => {
        if (!date) return;
        setData((prev) => {
            const safePrev = prev && typeof prev === "object" ? prev : { activeDate: todayKey(), entries: {} };
            const nextEntries = safePrev.entries && typeof safePrev.entries === "object" ? { ...safePrev.entries } : {};
            if (!nextEntries[date]) nextEntries[date] = cloneDefaultItems();
            return { ...safePrev, activeDate: date, entries: nextEntries };
        });
    };

    const goPrevDate = () => setActiveDate(shiftIsoDate(activeDate, -1));
    const goNextDate = () => setActiveDate(shiftIsoDate(activeDate, 1));
    const goToday = () => setActiveDate(todayKey());

    const updateDatePart = (part, value) => {
        const parts = { day, month, year, [part]: value };
        const nextIso = `${parts.year}-${parts.month}-${parts.day}`;
        setActiveDate(nextIso);
    };

    const toggleItem = (id) => {
        setData((prev) => ({
            ...prev,
            entries: {
                ...(prev.entries || {}),
                [prev.activeDate]: ((prev.entries || {})[prev.activeDate] || []).map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            ),
            },
        }));
    };

    const markAll = () => {
        setData((prev) => ({
            ...prev,
            entries: {
                ...(prev.entries || {}),
                [prev.activeDate]: ((prev.entries || {})[prev.activeDate] || []).map((item) => ({ ...item, checked: true })),
            },
        }));
    };

    const clearAll = () => {
        setData((prev) => ({
            ...prev,
            entries: {
                ...(prev.entries || {}),
                [prev.activeDate]: ((prev.entries || {})[prev.activeDate] || []).map((item) => ({ ...item, checked: false })),
            },
        }));
    };

    const addItem = () => {
        const label = newItemText.trim();
        if (!label) return;

        setData((prev) => {
            const currentItems = ((prev.entries || {})[prev.activeDate] || []);
            return {
                ...prev,
                entries: {
                    ...(prev.entries || {}),
                    [prev.activeDate]: [
                        ...currentItems,
                        {
                            id: Date.now(),
                            label,
                            checked: false,
                        },
                    ],
                },
            };
        });

        setNewItemText("");
    };

    return (
        <div className="page">
            <PageHeader title="Daily Checklist" subtitle="Applications" backTo="/" />

            <div className="callout-card" style={{ marginBottom: "12px" }}>
                <div className="crud-card__actions" style={{ marginBottom: "6px" }}>
                    <button className="btn btn--ghost btn--sm" onClick={goPrevDate}>← Prev Day</button>
                    <button className="btn btn--secondary btn--sm" onClick={goToday}>Today</button>
                    <button className="btn btn--ghost btn--sm" onClick={goNextDate}>Next Day →</button>
                </div>
                <p className="callout-card__text">Date: {formatDisplayDate(activeDate)}</p>
                <p className="callout-card__text">Completed: {checkedCount}/{items.length}</p>
                <div className="form__group" style={{ marginTop: "10px" }}>
                    <label className="form__label">Choose Date</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <select className="form__input" value={day} onChange={(e) => updateDatePart("day", e.target.value)}>
                            {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        <select className="form__input" value={month} onChange={(e) => updateDatePart("month", e.target.value)}>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <select className="form__input" value={year} onChange={(e) => updateDatePart("year", e.target.value)}>
                            {Array.from({ length: 21 }, (_, i) => String(2018 + i)).map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                    <button className="btn btn--secondary btn--sm" onClick={markAll}>Mark All</button>
                    <button className="btn btn--ghost btn--sm" onClick={clearAll}>Reset This Date</button>
                </div>
                <div className="crud-card__actions" style={{ marginTop: "10px" }}>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Add new portal or checklist item"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addItem();
                        }}
                    />
                    <button className="btn btn--primary btn--sm" onClick={addItem}>Add</button>
                </div>
            </div>

            <div className="checklist-list">
                {items.map((item) => (
                    <div key={item.id} className="checklist-item" onClick={() => toggleItem(item.id)}>
                        <input
                            type="checkbox"
                            className="checklist-item__check"
                            checked={item.checked}
                            onChange={() => toggleItem(item.id)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checklist-item__text">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyChecklistPage;

import { getStore } from "@netlify/blobs";

const store = getStore("app-storage");

const json = (statusCode, payload) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});

export default async (req) => {
    try {
        const url = new URL(req.url);
        const key = url.searchParams.get("key");

        if (req.method === "GET") {
            if (key) {
                const value = await store.get(key, { type: "json" });
                if (value === null || value === undefined) {
                    return json(200, { found: false, value: null });
                }
                return json(200, { found: true, value });
            }

            const listResult = await store.list();
            const values = {};

            for (const blob of listResult.blobs) {
                values[blob.key] = await store.get(blob.key, { type: "json" });
            }

            return json(200, { found: true, values });
        }

        if (req.method === "PUT") {
            const body = await req.json();
            if (!body || typeof body.key !== "string" || body.key.trim().length === 0) {
                return json(400, { error: "A valid key is required." });
            }

            await store.set(body.key, JSON.stringify(body.value));
            return json(200, { ok: true });
        }

        if (req.method === "POST") {
            const body = await req.json();
            const entries = body?.entries;

            if (!Array.isArray(entries)) {
                return json(400, { error: "entries must be an array." });
            }

            for (const entry of entries) {
                if (!entry || typeof entry.key !== "string" || entry.key.trim().length === 0) {
                    continue;
                }
                await store.set(entry.key, JSON.stringify(entry.value));
            }

            return json(200, { ok: true });
        }

        if (req.method === "DELETE") {
            if (key) {
                await store.delete(key);
                return json(200, { ok: true });
            }

            const listResult = await store.list();
            await Promise.all(listResult.blobs.map((blob) => store.delete(blob.key)));
            return json(200, { ok: true });
        }

        return json(405, { error: "Method not allowed." });
    } catch (error) {
        return json(500, { error: "Storage API error", details: String(error?.message || error) });
    }
};

import { useEffect, useState } from "react";

// Instructor photo URLs (kept in sync with Curriculum.tsx).
// Bump PHOTO_VERSION in Curriculum.tsx AND here after re-uploading images.
const PHOTO_VERSION = "2026-07-20";
const PHOTOS: { name: string; url: string }[] = [
  { name: "Nikola Budanović", url: "/__l5e/assets-v1/b6b10c48-6222-4edd-ada8-88464d6e6d3f/nikola-budanovic.jpg" },
  { name: "Aleksandar Mastilović", url: "/__l5e/assets-v1/72ead53e-1c06-4a48-99cf-d860761648bb/aleksandar-mastilovic.jpg" },
  { name: "Ivan Barać", url: "/__l5e/assets-v1/cce44c23-39df-413a-9b3f-d822080f3f18/ivan-barac.jpg" },
  { name: "Nenad Nikolovski", url: "/__l5e/assets-v1/caa54ac4-750c-4ddb-b8d6-e196df2fdbc9/nenad-nikolovski.jpg" },
];

type Row = {
  name: string;
  url: string;
  status?: number;
  etag?: string | null;
  lastModified?: string | null;
  size?: string | null;
  fromCache?: boolean;
  error?: string;
};

/**
 * Dev/debug widget that verifies the browser (and CDN) are serving the
 * expected instructor photos after a publish.
 *
 * Activate by appending `?debug=photos` to the URL on the preview or
 * published site. The widget fetches each image with cache-busting,
 * reads ETag / Last-Modified / Content-Length and reports whether the
 * current PHOTO_VERSION query param made it through.
 */
export default function PhotoCacheCheck() {
  const [enabled, setEnabled] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [checkedAt, setCheckedAt] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get("debug") === "photos");
  }, []);

  const runCheck = async () => {
    const bust = Date.now();
    const results: Row[] = await Promise.all(
      PHOTOS.map(async (p) => {
        const url = `${p.url}?v=${PHOTO_VERSION}&_=${bust}`;
        try {
          const res = await fetch(url, { method: "GET", cache: "no-store" });
          return {
            name: p.name,
            url,
            status: res.status,
            etag: res.headers.get("etag"),
            lastModified: res.headers.get("last-modified"),
            size: res.headers.get("content-length"),
            fromCache: (res as Response & { fromCache?: boolean }).fromCache,
          };
        } catch (e) {
          return { name: p.name, url, error: (e as Error).message };
        }
      })
    );
    setRows(results);
    setCheckedAt(new Date().toISOString());
  };

  useEffect(() => {
    if (enabled) runCheck();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-[min(520px,calc(100vw-2rem))] bg-black/95 border border-brand-red/60 rounded-lg shadow-2xl text-xs text-white font-mono">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <div>
          <div className="font-bold text-brand-red">Photo cache check</div>
          <div className="opacity-70">
            PHOTO_VERSION = <span className="text-white">{PHOTO_VERSION}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runCheck}
            className="px-2 py-1 bg-brand-red/80 hover:bg-brand-red rounded text-white"
          >
            Re-check
          </button>
          <button
            onClick={() => setEnabled(false)}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded"
          >
            ×
          </button>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-auto p-2 space-y-2">
        {rows.map((r) => {
          const ok = r.status && r.status >= 200 && r.status < 400;
          return (
            <div
              key={r.url}
              className={`border rounded p-2 ${ok ? "border-green-500/40" : "border-red-500/60"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{r.name}</span>
                <span className={ok ? "text-green-400" : "text-red-400"}>
                  {r.status ?? "ERR"}
                </span>
              </div>
              <div className="opacity-70 break-all">{r.url}</div>
              {r.error ? (
                <div className="text-red-400">{r.error}</div>
              ) : (
                <div className="grid grid-cols-1 gap-0.5 mt-1">
                  <div>ETag: <span className="text-white">{r.etag ?? "—"}</span></div>
                  <div>Last-Modified: <span className="text-white">{r.lastModified ?? "—"}</span></div>
                  <div>Size: <span className="text-white">{r.size ?? "—"} B</span></div>
                </div>
              )}
            </div>
          );
        })}
        {checkedAt && (
          <div className="opacity-60 text-[10px] pt-1">Checked at {checkedAt}</div>
        )}
      </div>
    </div>
  );
}
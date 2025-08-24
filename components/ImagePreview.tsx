export function ImagePreview({ dataUrl }: { dataUrl?: string | null }) {
  if (!dataUrl) return null;
  return (
    <div className="mt-2">
      {/* The MCP image endpoint returns base64 data URL; we render directly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Generated"
        src={dataUrl}
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 max-h-[360px] object-contain"
      />
    </div>
  );
}

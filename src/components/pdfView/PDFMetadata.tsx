// src/components/pdfView/PDFMetadata.tsx
import type { Metadata } from "@/lib/api";

type Props = {
  metadata: Metadata;
};

/**
 * Convert a raw PDF date string (e.g., "D:20250519045555-07'00'")
 * into a human-readable format like "May 19, 2025, 04:55:55 AM".
 * If the input is empty or invalid, returns "None".
 */
function formatPdfDate(raw: string): string {
  if (!raw || !raw.startsWith("D:")) {
    return "None";
  }

  try {
    // Drop the "D:" prefix
    const ts = raw.slice(2);

    // Extract date/time components
    const year = ts.slice(0, 4);
    const month = ts.slice(4, 6);
    const day = ts.slice(6, 8);
    const hour = ts.slice(8, 10);
    const minute = ts.slice(10, 12);
    const second = ts.slice(12, 14);

    // The remainder is the timezone offset, e.g. "-07'00'"
    let offsetRaw = ts.slice(14); // e.g. "-07'00'"
    // Remove apostrophes and ensure colon in offset: "-07:00"
    offsetRaw = offsetRaw.replace(/'/g, "").replace(/^([+-]\d{2})(\d{2})$/, "$1:$2");

    // Build an ISO‐8601 string
    const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}${offsetRaw}`;
    const dateObj = new Date(iso);

    if (isNaN(dateObj.getTime())) {
      return "None";
    }

    // Format to a readable string, e.g. "May 19, 2025, 04:55:55 AM"
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return "None";
  }
}

export default function PDFMetadata({ metadata }: Props) {
  return (
    <div className="mb-4 p-4 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 text-gray-100">
      <h3 className="text-lg font-semibold text-blue-300 mb-2">PDF Metadata</h3>
      <dl className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Title:</dt>
          <dd>{metadata.title?.trim() || "None"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Author:</dt>
          <dd>{metadata.author?.trim() || "None"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Subject:</dt>
          <dd>{metadata.subject?.trim() || "None"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Keywords:</dt>
          <dd>{metadata.keywords?.trim() || "None"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Creator:</dt>
          <dd>{metadata.creator?.trim() || "None"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Producer:</dt>
          <dd>{metadata.producer?.trim() || "None"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Creation Date:</dt>
          <dd>{formatPdfDate(metadata.creation_date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-green-300">Modified Date:</dt>
          <dd>{formatPdfDate(metadata.mod_date)}</dd>
        </div>
      </dl>
    </div>
  );
}

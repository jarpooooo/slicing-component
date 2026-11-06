"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { FormatCard } from "./FormatCard";

/**
 * Learning formats from GET /api/formats.
 * Figma shows 3 cards in a row; the API returns 4, so the desktop grid uses
 * 4 columns at xl (1440) and 2 columns from md.
 */
export function FormatGrid() {
  const formats = useApi("formats", (signal) => api.getFormats({ signal }));

  return (
    <AsyncContent
      state={formats}
      loading={<LoadingSkeleton count={4} label="Loading learning formats…" />}
      empty={<EmptyState title="No learning formats yet" />}
      error={(message, retry) => (
        <ErrorState title="Couldn't load the formats" message={message} onRetry={retry} />
      )}
    >
      {(data) => (
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.map((format) => (
            <li key={format.id}>
              <FormatCard format={format} />
            </li>
          ))}
        </ul>
      )}
    </AsyncContent>
  );
}

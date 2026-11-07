"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { TrackCard } from "./TrackCard";

const gridClass = "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

/** Tracks from GET /api/tracks, with loading, error and empty states. */
export function TrackGrid() {
  const tracks = useApi("tracks", (signal) => api.getTracks({ signal }));

  return (
    <AsyncContent
      state={tracks}
      loading={<LoadingSkeleton variant="cards" count={3} label="Loading learning tracks…" />}
      empty={
        <EmptyState
          title="No tracks open right now"
          description="New learning tracks are announced each semester. Check back soon."
        />
      }
      error={(message, retry) => (
        <ErrorState title="Couldn't load the tracks" message={message} onRetry={retry} />
      )}
    >
      {(data) => (
        <ul className={gridClass}>
          {data.map((track) => (
            <li key={track.id}>
              <TrackCard track={track} />
            </li>
          ))}
        </ul>
      )}
    </AsyncContent>
  );
}

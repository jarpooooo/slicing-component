import type { Track } from "@/lib/types";

import { EmptyState } from "./EmptyState";
import { TrackCard } from "./TrackCard";

/** Track cards in a grid. Used on Landing and Overview. */
export function TrackList({ tracks }: { tracks: Track[] }) {
  if (tracks.length === 0) {
    return (
      <EmptyState
        title="No tracks open right now"
        description="New learning tracks are announced each semester. Check back soon."
      />
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => (
        <li key={track.id}>
          <TrackCard track={track} />
        </li>
      ))}
    </ul>
  );
}

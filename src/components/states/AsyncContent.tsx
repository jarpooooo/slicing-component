"use client";

import type { ReactNode } from "react";

import type { ApiState } from "@/hooks/useApi";

import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingSkeleton } from "./LoadingSkeleton";

type AsyncContentProps<T> = {
  state: ApiState<T>;
  /** Rendered only on success, with non-empty data. */
  children: (data: T) => ReactNode;
  loading?: ReactNode;
  empty?: ReactNode;
  /** Override the error UI; receives the message and retry callback. */
  error?: (message: string, retry: () => void) => ReactNode;
};

/**
 * Renders the right UI for each `useApi` status so sections only describe the
 * success case:
 *
 * <AsyncContent state={tracks} loading={<LoadingSkeleton variant="cards" />}>
 *   {(data) => data.map(...)}
 * </AsyncContent>
 */
export function AsyncContent<T>({ state, children, loading, empty, error }: AsyncContentProps<T>) {
  switch (state.status) {
    case "loading":
      return loading ?? <LoadingSkeleton />;
    case "error":
      return error ? (
        error(state.error.message, state.retry)
      ) : (
        <ErrorState message={state.error.message} onRetry={state.retry} />
      );
    case "empty":
      return empty ?? <EmptyState />;
    case "success":
      return children(state.data);
  }
}

"use client";

import { useCallback, useEffect, useEffectEvent, useState } from "react";

import { ApiError } from "@/lib/api";

export type ApiStatus = "loading" | "error" | "success" | "empty";

export type ApiState<T> =
  | { status: "loading"; data: undefined; error: undefined; retry: () => void }
  | { status: "error"; data: undefined; error: ApiError; retry: () => void }
  | { status: "empty"; data: T; error: undefined; retry: () => void }
  | { status: "success"; data: T; error: undefined; retry: () => void };

type Settled<T> =
  { requestId: string; ok: true; data: T } | { requestId: string; ok: false; error: ApiError };

export type UseApiOptions<T> = {
  /** Decide when a successful payload counts as "empty". Default: empty array / null. */
  isEmpty?: (data: T) => boolean;
};

function defaultIsEmpty(data: unknown) {
  return data == null || (Array.isArray(data) && data.length === 0);
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return new ApiError(message, null, { cause: error });
}

/**
 * Fetch data on the client and expose a single status:
 * `loading | error | success | empty`, plus `retry()`.
 *
 * @param key     Stable cache key; the request re-runs whenever it changes
 *                (include any arguments, e.g. `faqs:${category}`).
 * @param fetcher Receives an AbortSignal; usually one of the `api.*` functions.
 *
 * @example
 * const tracks = useApi("tracks", (signal) => api.getTracks({ signal }));
 * if (tracks.status === "success") tracks.data.map(...)
 */
export function useApi<T>(
  key: string,
  fetcher: (signal: AbortSignal) => Promise<T>,
  { isEmpty = defaultIsEmpty }: UseApiOptions<T> = {},
): ApiState<T> {
  const [attempt, setAttempt] = useState(0);
  const [settled, setSettled] = useState<Settled<T> | null>(null);
  const requestId = `${key}#${attempt}`;

  // Always call the latest fetcher without making it an effect dependency.
  const runFetcher = useEffectEvent((signal: AbortSignal) => fetcher(signal));

  useEffect(() => {
    const controller = new AbortController();
    runFetcher(controller.signal).then(
      (data) => setSettled({ requestId, ok: true, data }),
      (error: unknown) => {
        if (controller.signal.aborted) return;
        setSettled({ requestId, ok: false, error: toApiError(error) });
      },
    );
    return () => controller.abort();
  }, [requestId]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  // Anything not settled for the *current* request is still loading — this also
  // covers key changes and retries without a synchronous setState in the effect.
  if (!settled || settled.requestId !== requestId) {
    return { status: "loading", data: undefined, error: undefined, retry };
  }
  if (!settled.ok) {
    return { status: "error", data: undefined, error: settled.error, retry };
  }
  if (isEmpty(settled.data)) {
    return { status: "empty", data: settled.data, error: undefined, retry };
  }
  return { status: "success", data: settled.data, error: undefined, retry };
}

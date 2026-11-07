import type {
  ApiResponse,
  CommunityStats,
  CommunityValue,
  ContributionRole,
  Faq,
  InquiryCategory,
  InquiryCategoryId,
  JourneyStep,
  LearningFormat,
  NavigationLink,
  Track,
  TrackId,
} from "./types";

const DEFAULT_API_URL = "https://gdgoc-ugm-api.vercel.app/api";

/**
 * Base URL from NEXT_PUBLIC_API_URL, falling back to the public API so the app runs
 * without a .env file. It has to be read as a literal `process.env.NEXT_PUBLIC_*`
 * for Next.js to inline it.
 */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL).replace(
  /\/+$/,
  "",
);

/** Error thrown for network failures, non-2xx responses and `{ success: false }` bodies. */
export class ApiError extends Error {
  /** HTTP status, or null when the request never got a response (offline, DNS, CORS). */
  readonly status: number | null;

  constructor(message: string, status: number | null, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ApiError";
    this.status = status;
  }
}

export type RequestOptions = {
  signal?: AbortSignal;
  searchParams?: Record<string, string | undefined>;
};

function isApiResponse(body: unknown): body is ApiResponse<unknown> {
  return typeof body === "object" && body !== null && "success" in body;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

async function request<T>(path: string, { signal, searchParams }: RequestOptions = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(key, value);
  }

  let response: Response;
  try {
    response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new ApiError("Could not reach the server. Check your connection.", null, {
      cause: error,
    });
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    throw new ApiError(
      `Unexpected response from the server (HTTP ${response.status}).`,
      response.status,
      {
        cause: error,
      },
    );
  }

  if (!isApiResponse(body)) {
    throw new ApiError("Unexpected response format from the server.", response.status);
  }
  if (!body.success) {
    throw new ApiError(body.error, response.status);
  }
  if (!response.ok) {
    throw new ApiError(`Request failed with HTTP ${response.status}.`, response.status);
  }

  return body.data as T;
}

// Endpoints

export const api = {
  getTracks: (options?: RequestOptions) => request<Track[]>("/tracks", options),
  getTrack: (id: TrackId, options?: RequestOptions) =>
    request<Track>(`/tracks/${encodeURIComponent(id)}`, options),
  getValues: (options?: RequestOptions) => request<CommunityValue[]>("/values", options),
  getFormats: (options?: RequestOptions) => request<LearningFormat[]>("/formats", options),
  getJourney: (options?: RequestOptions) => request<JourneyStep[]>("/journey", options),
  getRoles: (options?: RequestOptions) => request<ContributionRole[]>("/roles", options),
  getInquiryCategories: (options?: RequestOptions) =>
    request<InquiryCategory[]>("/inquiry-categories", options),
  getFaqs: (category?: InquiryCategoryId, options?: RequestOptions) =>
    request<Faq[]>("/faqs", {
      ...options,
      searchParams: { ...options?.searchParams, category },
    }),
  getStats: (options?: RequestOptions) => request<CommunityStats>("/stats", options),
  getNavigation: (options?: RequestOptions) => request<NavigationLink[]>("/navigation", options),
};

/**
 * Configuration for JiraClient
 */
export interface JiraClientConfig {
  /** Jira Personal Access Token for authentication */
  token: string;
  /** Base URL for Jira Server (e.g., 'https://jira.example.com') */
  baseUrl: string;
  /** Optional axios configuration (timeout, headers, etc.) */
  axiosConfig?: {
    timeout?: number;
    headers?: Record<string, string>;
    [key: string]: unknown;
  };
}

/**
 * Generic paginated response for Jira DC search endpoints
 */
export interface JiraSearchResponse<T> {
  /** Starting index of this page */
  startAt: number;
  /** Maximum results per page */
  maxResults: number;
  /** Total number of matching results */
  total: number;
  /** Array of items in this page */
  issues: T[];
  /** Expand info */
  expand?: string;
  /** Warning messages */
  warningMessages?: string[];
}

/**
 * Jira API error response
 */
export interface JiraErrorResponse {
  /** Error messages array */
  errorMessages?: string[];
  /** Errors by field */
  errors?: Record<string, string>;
}

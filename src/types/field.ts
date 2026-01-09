/**
 * Jira field definition
 */
export interface JiraField {
  /** Field ID (e.g., "summary", "customfield_10001") */
  id: string;
  /** Field key (may differ from id) */
  key?: string;
  /** Field name (display name) */
  name: string;
  /** Whether field is custom */
  custom: boolean;
  /** Whether field is orderable */
  orderable?: boolean;
  /** Whether field is navigable */
  navigable?: boolean;
  /** Whether field is searchable */
  searchable?: boolean;
  /** Clause names for JQL */
  clauseNames?: string[];
  /** Field schema */
  schema?: {
    type: string;
    items?: string;
    system?: string;
    custom?: string;
    customId?: number;
  };
}

/**
 * Parameters for getFields method
 */
export interface GetFieldsParams {
  /** Force refresh from server (bypass cache) */
  refresh?: boolean;
}

/**
 * Parameters for internal field caching
 */
export interface FieldCache {
  /** Cached field list */
  fields: JiraField[];
  /** Map of lowercase name -> field ID */
  nameToIdMap: Map<string, string>;
  /** Timestamp of last refresh */
  lastRefresh: number;
}

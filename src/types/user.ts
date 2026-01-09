/**
 * Jira user object
 */
export interface JiraUser {
  /** Self URL */
  self?: string;
  /** Account ID (Cloud) or key (DC) */
  key?: string;
  /** Username (name in DC) */
  name: string;
  /** Email address */
  emailAddress?: string;
  /** Display name */
  displayName: string;
  /** Whether user is active */
  active?: boolean;
  /** Whether user is deleted */
  deleted?: boolean;
  /** Time zone */
  timeZone?: string;
  /** Locale */
  locale?: string;
  /** Avatar URLs */
  avatarUrls?: Record<string, string>;
  /** User groups */
  groups?: {
    size: number;
    items: Array<{ name: string; self?: string }>;
  };
  /** Application roles */
  applicationRoles?: {
    size: number;
    items: Array<{ key: string; name: string }>;
  };
  /** Expand info */
  expand?: string;
}

/**
 * Parameters for getMyself method
 */
export interface GetMyselfParams {
  /** Fields to expand */
  expand?: string;
}

/**
 * Parameters for getUser method
 */
export interface GetUserParams {
  /** Username to look up */
  username: string;
  /** Key to look up (alternative to username) */
  key?: string;
  /** Fields to expand */
  expand?: string;
}

/**
 * Parameters for searchUsers method
 */
export interface SearchUsersParams {
  /** Username pattern to search */
  username: string;
  /** Starting index */
  startAt?: number;
  /** Maximum results */
  maxResults?: number;
  /** Include active users */
  includeActive?: boolean;
  /** Include inactive users */
  includeInactive?: boolean;
}

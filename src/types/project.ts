import type { JiraUser } from './user.js';

/**
 * Jira project object
 */
export interface JiraProject {
  /** Self URL */
  self?: string;
  /** Project ID */
  id: string;
  /** Project key (e.g., "PROJ") */
  key: string;
  /** Project name */
  name: string;
  /** Project description */
  description?: string;
  /** Project lead */
  lead?: JiraUser;
  /** Project category */
  projectCategory?: {
    id: string;
    name: string;
    description?: string;
  };
  /** Avatar URLs */
  avatarUrls?: Record<string, string>;
  /** Project type key */
  projectTypeKey?: string;
  /** Whether project is archived */
  archived?: boolean;
  /** Expand info */
  expand?: string;
}

/**
 * Parameters for getProjects method
 */
export interface GetProjectsParams {
  /** Fields to expand */
  expand?: string;
  /** Include archived projects */
  includeArchived?: boolean;
}

/**
 * Parameters for getProject method
 */
export interface GetProjectParams {
  /** Project key or ID */
  projectKeyOrId: string;
  /** Fields to expand */
  expand?: string;
}

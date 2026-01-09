/**
 * Jira board object (Agile API)
 */
export interface JiraBoard {
  /** Board ID */
  id: number;
  /** Self URL */
  self: string;
  /** Board name */
  name: string;
  /** Board type */
  type: 'scrum' | 'kanban' | 'simple';
  /** Board location (project info) */
  location?: {
    projectId: number;
    displayName?: string;
    projectName?: string;
    projectKey?: string;
    projectTypeKey?: string;
    avatarURI?: string;
    name?: string;
  };
}

/**
 * Paginated board response
 */
export interface JiraBoardResponse {
  maxResults: number;
  startAt: number;
  total?: number;
  isLast: boolean;
  values: JiraBoard[];
}

/**
 * Jira sprint object (Agile API)
 */
export interface JiraSprint {
  /** Sprint ID */
  id: number;
  /** Self URL */
  self: string;
  /** Sprint state */
  state: 'future' | 'active' | 'closed';
  /** Sprint name */
  name: string;
  /** Start date (ISO format) */
  startDate?: string;
  /** End date (ISO format) */
  endDate?: string;
  /** Complete date (ISO format) */
  completeDate?: string;
  /** Activated date (ISO format) */
  activatedDate?: string;
  /** Origin board ID */
  originBoardId?: number;
  /** Sprint goal */
  goal?: string;
  /** Whether sprint is synced */
  synced?: boolean;
}

/**
 * Paginated sprint response
 */
export interface JiraSprintResponse {
  maxResults: number;
  startAt: number;
  isLast: boolean;
  values: JiraSprint[];
}

/**
 * Parameters for getBoards method
 */
export interface GetBoardsParams {
  /** Filter by project key or ID */
  projectKeyOrId?: string;
  /** Filter by board type */
  type?: 'scrum' | 'kanban' | 'simple';
  /** Board name (contains match) */
  name?: string;
  /** Starting index */
  startAt?: number;
  /** Maximum results */
  maxResults?: number;
}

/**
 * Parameters for getSprints method
 */
export interface GetSprintsParams {
  /** Board ID */
  boardId: number;
  /** Filter by sprint state */
  state?: 'future' | 'active' | 'closed';
  /** Starting index */
  startAt?: number;
  /** Maximum results */
  maxResults?: number;
}

/**
 * Parameters for getSprintIssues method
 */
export interface GetSprintIssuesParams {
  /** Sprint ID */
  sprintId: number;
  /** Starting index */
  startAt?: number;
  /** Maximum results */
  maxResults?: number;
  /** Fields to return */
  fields?: string | string[];
  /** Fields to expand */
  expand?: string;
  /** JQL to filter issues within sprint */
  jql?: string;
}

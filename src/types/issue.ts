import type { JiraUser } from './user.js';
import type { JiraProject } from './project.js';
import type { JiraIssueLink, JiraIssueBasic } from './link.js';

/**
 * Jira issue type object
 */
export interface JiraIssueType {
  /** Self URL */
  self?: string;
  /** Issue type ID */
  id: string;
  /** Issue type name (e.g., "Bug", "Story", "Sub-Bug") */
  name: string;
  /** Issue type description */
  description?: string;
  /** Whether this is a subtask type */
  subtask: boolean;
  /** Icon URL */
  iconUrl?: string;
  /** Avatar ID */
  avatarId?: number;
}

/**
 * Jira status object
 */
export interface JiraStatus {
  /** Self URL */
  self?: string;
  /** Status ID */
  id: string;
  /** Status name */
  name: string;
  /** Status description */
  description?: string;
  /** Icon URL */
  iconUrl?: string;
  /** Status category */
  statusCategory?: {
    id: number;
    key: string;
    name: string;
    colorName: string;
  };
}

/**
 * Jira priority object
 */
export interface JiraPriority {
  /** Self URL */
  self?: string;
  /** Priority ID */
  id: string;
  /** Priority name (e.g., "High", "Medium", "Low") */
  name: string;
  /** Icon URL */
  iconUrl?: string;
}

/**
 * Jira resolution object
 */
export interface JiraResolution {
  /** Self URL */
  self?: string;
  /** Resolution ID */
  id: string;
  /** Resolution name */
  name: string;
  /** Resolution description */
  description?: string;
}

/**
 * Jira component object
 */
export interface JiraComponent {
  /** Self URL */
  self?: string;
  /** Component ID */
  id: string;
  /** Component name */
  name: string;
  /** Component description */
  description?: string;
  /** Lead user */
  lead?: JiraUser;
}

/**
 * Jira version/fix version object
 */
export interface JiraVersion {
  /** Self URL */
  self?: string;
  /** Version ID */
  id: string;
  /** Version name */
  name: string;
  /** Whether version is archived */
  archived?: boolean;
  /** Whether version is released */
  released?: boolean;
  /** Release date */
  releaseDate?: string;
  /** Start date */
  startDate?: string;
  /** Description */
  description?: string;
}

/**
 * Jira comment object
 */
export interface JiraComment {
  /** Self URL */
  self?: string;
  /** Comment ID */
  id: string;
  /** Comment author */
  author?: JiraUser;
  /** Comment body (text or ADF) */
  body: string | object;
  /** Update author */
  updateAuthor?: JiraUser;
  /** Created date */
  created: string;
  /** Updated date */
  updated?: string;
}

/**
 * Jira worklog entry
 */
export interface JiraWorklog {
  /** Self URL */
  self?: string;
  /** Worklog ID */
  id: string;
  /** Author */
  author?: JiraUser;
  /** Update author */
  updateAuthor?: JiraUser;
  /** Comment */
  comment?: string;
  /** Created date */
  created: string;
  /** Updated date */
  updated?: string;
  /** Started date */
  started: string;
  /** Time spent (e.g., "3h 20m") */
  timeSpent: string;
  /** Time spent in seconds */
  timeSpentSeconds: number;
}

/**
 * Jira attachment
 */
export interface JiraAttachment {
  /** Self URL */
  self?: string;
  /** Attachment ID */
  id: string;
  /** Filename */
  filename: string;
  /** Author */
  author?: JiraUser;
  /** Created date */
  created: string;
  /** File size */
  size: number;
  /** MIME type */
  mimeType?: string;
  /** Content URL */
  content?: string;
  /** Thumbnail URL */
  thumbnail?: string;
}

/**
 * Jira changelog item
 */
export interface JiraChangelogItem {
  /** Field name */
  field: string;
  /** Field type */
  fieldtype: string;
  /** Field ID (for custom fields) */
  fieldId?: string;
  /** From value (ID) */
  from?: string | null;
  /** From value (display) */
  fromString?: string | null;
  /** To value (ID) */
  to?: string | null;
  /** To value (display) */
  toString?: string | null;
}

/**
 * Jira changelog history entry
 */
export interface JiraChangelogHistory {
  /** History ID */
  id: string;
  /** Author */
  author?: JiraUser;
  /** Created date */
  created: string;
  /** Items changed */
  items: JiraChangelogItem[];
}

/**
 * Jira changelog container
 */
export interface JiraChangelog {
  /** Starting index */
  startAt: number;
  /** Max results */
  maxResults: number;
  /** Total histories */
  total: number;
  /** History entries */
  histories: JiraChangelogHistory[];
}

/**
 * Jira issue fields object
 */
export interface JiraIssueFields {
  /** Issue summary/title */
  summary: string;
  /** Issue description */
  description?: string | object | null;
  /** Issue type */
  issuetype: JiraIssueType;
  /** Project */
  project: JiraProject;
  /** Status */
  status: JiraStatus;
  /** Priority */
  priority?: JiraPriority | null;
  /** Resolution */
  resolution?: JiraResolution | null;
  /** Assignee */
  assignee?: JiraUser | null;
  /** Reporter */
  reporter?: JiraUser | null;
  /** Creator */
  creator?: JiraUser | null;
  /** Created date */
  created: string;
  /** Updated date */
  updated: string;
  /** Due date */
  duedate?: string | null;
  /** Resolution date */
  resolutiondate?: string | null;
  /** Labels */
  labels?: string[];
  /** Components */
  components?: JiraComponent[];
  /** Fix versions */
  fixVersions?: JiraVersion[];
  /** Affected versions */
  versions?: JiraVersion[];
  /** Issue links */
  issuelinks?: JiraIssueLink[];
  /** Subtasks */
  subtasks?: JiraIssueBasic[];
  /** Parent issue (for subtasks) */
  parent?: JiraIssueBasic;
  /** Comments container */
  comment?: {
    comments: JiraComment[];
    maxResults: number;
    total: number;
    startAt: number;
  };
  /** Worklogs container */
  worklog?: {
    worklogs: JiraWorklog[];
    maxResults: number;
    total: number;
    startAt: number;
  };
  /** Attachments */
  attachment?: JiraAttachment[];
  /** Time tracking */
  timetracking?: {
    originalEstimate?: string;
    remainingEstimate?: string;
    timeSpent?: string;
    originalEstimateSeconds?: number;
    remainingEstimateSeconds?: number;
    timeSpentSeconds?: number;
  };
  /** Watches */
  watches?: {
    self?: string;
    watchCount: number;
    isWatching: boolean;
  };
  /** Votes */
  votes?: {
    self?: string;
    votes: number;
    hasVoted: boolean;
  };
  /** Custom fields - any field starting with customfield_ */
  [key: `customfield_${string}`]: unknown;
}

/**
 * Complete Jira issue object
 */
export interface JiraIssue {
  /** Issue ID */
  id: string;
  /** Issue key (e.g., "PROJ-123") */
  key: string;
  /** Self URL */
  self?: string;
  /** Expand info */
  expand?: string;
  /** Issue fields */
  fields: JiraIssueFields;
  /** Changelog (if expanded) */
  changelog?: JiraChangelog;
  /** Rendered fields (if expanded) */
  renderedFields?: Record<string, unknown>;
  /** Names (field ID to name mapping, if expanded) */
  names?: Record<string, string>;
}

/**
 * Parameters for searchIssues method
 */
export interface SearchIssuesParams {
  /** JQL query string */
  jql: string;
  /** Starting index for pagination */
  startAt?: number;
  /** Maximum results to return (max 50 for DC) */
  maxResults?: number;
  /** Fields to return (comma-separated or array) */
  fields?: string | string[];
  /** Fields to expand */
  expand?: string;
  /** Validate JQL query */
  validateQuery?: boolean;
}

/**
 * Parameters for getIssue method
 */
export interface GetIssueParams {
  /** Issue key or ID (e.g., "PROJ-123") */
  issueKeyOrId: string;
  /** Fields to return (comma-separated or array, or "*all") */
  fields?: string | string[];
  /** Fields to expand (e.g., "changelog,renderedFields") */
  expand?: string;
  /** Issue properties to return */
  properties?: string;
  /** Update user's issue history */
  updateHistory?: boolean;
}

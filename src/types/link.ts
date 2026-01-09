import type { JiraStatus, JiraPriority, JiraIssueType } from './issue.js';

/**
 * Jira issue link type
 */
export interface JiraIssueLinkType {
  /** Link type ID */
  id: string;
  /** Link type name */
  name: string;
  /** Inward description (e.g., "is blocked by") */
  inward: string;
  /** Outward description (e.g., "blocks") */
  outward: string;
  /** Self URL */
  self?: string;
}

/**
 * Response for getLinkTypes
 */
export interface JiraLinkTypesResponse {
  issueLinkTypes: JiraIssueLinkType[];
}

/**
 * Basic issue info (used in links, etc.)
 */
export interface JiraIssueBasic {
  /** Issue ID */
  id: string;
  /** Issue key */
  key: string;
  /** Self URL */
  self?: string;
  /** Issue fields (subset) */
  fields?: {
    summary?: string;
    status?: JiraStatus;
    priority?: JiraPriority;
    issuetype?: JiraIssueType;
  };
}

/**
 * Jira issue link
 */
export interface JiraIssueLink {
  /** Link ID */
  id: string;
  /** Self URL */
  self?: string;
  /** Link type */
  type: JiraIssueLinkType;
  /** Inward issue (if this is outward) */
  inwardIssue?: JiraIssueBasic;
  /** Outward issue (if this is inward) */
  outwardIssue?: JiraIssueBasic;
}

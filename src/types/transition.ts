import type { JiraStatus } from './issue.js';

/**
 * Jira transition object
 */
export interface JiraTransition {
  /** Transition ID */
  id: string;
  /** Transition name */
  name: string;
  /** Target status */
  to: JiraStatus;
  /** Whether user has permission */
  hasScreen?: boolean;
  /** Whether global transition */
  isGlobal?: boolean;
  /** Whether initial transition */
  isInitial?: boolean;
  /** Whether conditional */
  isConditional?: boolean;
  /** Fields for transition screen */
  fields?: Record<string, unknown>;
}

/**
 * Transitions response
 */
export interface JiraTransitionsResponse {
  expand?: string;
  transitions: JiraTransition[];
}

/**
 * Parameters for getTransitions method
 */
export interface GetTransitionsParams {
  /** Issue key or ID */
  issueKeyOrId: string;
  /** Transition ID (optional, to get specific transition) */
  transitionId?: string;
  /** Fields to expand */
  expand?: string;
}

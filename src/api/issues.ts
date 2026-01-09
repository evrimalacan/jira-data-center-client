import { BaseApi } from './base.js';
import type {
  JiraIssue,
  JiraSearchResponse,
  JiraTransitionsResponse,
  SearchIssuesParams,
  GetIssueParams,
  GetTransitionsParams,
} from '../types/index.js';

/**
 * Default fields to request when searching issues
 */
const DEFAULT_ISSUE_FIELDS = [
  'summary',
  'status',
  'issuetype',
  'priority',
  'assignee',
  'reporter',
  'creator',
  'created',
  'updated',
  'duedate',
  'resolutiondate',
  'resolution',
  'labels',
  'components',
  'fixVersions',
  'project',
  'parent',
  'description',
];

/**
 * Issue-related API methods
 */
export class IssuesApi extends BaseApi {
  /**
   * Search for issues using JQL (Jira Query Language).
   * Supports pagination - use startAt and maxResults to page through results.
   * Maximum 50 results per request on Jira DC.
   */
  async search(params: SearchIssuesParams): Promise<JiraSearchResponse<JiraIssue>> {
    const {
      jql,
      startAt = 0,
      maxResults = 50,
      fields,
      expand,
      validateQuery = true,
    } = params;

    let fieldsParam: string | undefined;
    if (Array.isArray(fields)) {
      fieldsParam = fields.join(',');
    } else if (fields) {
      fieldsParam = fields;
    } else {
      fieldsParam = DEFAULT_ISSUE_FIELDS.join(',');
    }

    const response = await this.client.get<JiraSearchResponse<JiraIssue>>('/search', {
      params: {
        jql,
        startAt,
        maxResults: Math.min(maxResults, 50),
        fields: fieldsParam,
        ...(expand && { expand }),
        validateQuery,
      },
    });
    return response.data;
  }

  /**
   * Search issues using POST (for long/complex JQL queries).
   * Same as search but uses POST to avoid URL length limits.
   */
  async searchPost(params: SearchIssuesParams): Promise<JiraSearchResponse<JiraIssue>> {
    const {
      jql,
      startAt = 0,
      maxResults = 50,
      fields,
      expand,
      validateQuery = true,
    } = params;

    let fieldsArray: string[];
    if (Array.isArray(fields)) {
      fieldsArray = fields;
    } else if (fields) {
      fieldsArray = fields.split(',').map((f) => f.trim());
    } else {
      fieldsArray = DEFAULT_ISSUE_FIELDS;
    }

    const response = await this.client.post<JiraSearchResponse<JiraIssue>>('/search', {
      jql,
      startAt,
      maxResults: Math.min(maxResults, 50),
      fields: fieldsArray,
      ...(expand && { expand: expand.split(',').map((e) => e.trim()) }),
      validateQuery,
    });
    return response.data;
  }

  /**
   * Get a single issue by key or ID with full details
   */
  async get(params: GetIssueParams): Promise<JiraIssue> {
    const { issueKeyOrId, fields, expand, properties, updateHistory = true } = params;

    let fieldsParam: string | undefined;
    if (Array.isArray(fields)) {
      fieldsParam = fields.join(',');
    } else {
      fieldsParam = fields;
    }

    const response = await this.client.get<JiraIssue>(`/issue/${issueKeyOrId}`, {
      params: {
        ...(fieldsParam && { fields: fieldsParam }),
        ...(expand && { expand }),
        ...(properties && { properties }),
        updateHistory,
      },
    });
    return response.data;
  }

  /**
   * Get issue transitions (available status changes)
   */
  async getTransitions(params: GetTransitionsParams): Promise<JiraTransitionsResponse> {
    const { issueKeyOrId, transitionId, expand } = params;
    const response = await this.client.get<JiraTransitionsResponse>(
      `/issue/${issueKeyOrId}/transitions`,
      {
        params: {
          ...(transitionId && { transitionId }),
          ...(expand && { expand }),
        },
      },
    );
    return response.data;
  }

  /**
   * Fetch all pages of search results (auto-pagination).
   * Use with caution for large result sets.
   */
  async searchAll(
    params: Omit<SearchIssuesParams, 'startAt'>,
    maxTotal = 1000,
  ): Promise<JiraIssue[]> {
    const allIssues: JiraIssue[] = [];
    let startAt = 0;
    const maxResults = params.maxResults ?? 50;

    while (allIssues.length < maxTotal) {
      const result = await this.search({
        ...params,
        startAt,
        maxResults: Math.min(maxResults, maxTotal - allIssues.length),
      });

      allIssues.push(...result.issues);

      if (allIssues.length >= result.total || result.issues.length === 0) {
        break;
      }

      startAt += result.issues.length;
    }

    return allIssues;
  }

  /**
   * Count issues matching a JQL query without fetching all data.
   */
  async count(jql: string): Promise<number> {
    const result = await this.search({
      jql,
      maxResults: 1,
      fields: ['key'],
    });
    return result.total;
  }
}

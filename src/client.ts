import type { JiraClientConfig, JiraUser } from './types/index.js';
import { UsersApi } from './api/users.js';
import { ProjectsApi } from './api/projects.js';
import { IssuesApi } from './api/issues.js';
import { FieldsApi } from './api/fields.js';
import { AgileApi } from './api/agile.js';
import { LinksApi } from './api/links.js';

/**
 * Jira Server/Data Center API client.
 * Provides typed methods for interacting with Jira Server REST API.
 *
 * Uses a facade pattern - all methods are organized by domain:
 * - client.users - User methods (getMyself, getUser, searchUsers)
 * - client.projects - Project methods (getAll, get)
 * - client.issues - Issue methods (search, get, searchAll, count, getTransitions)
 * - client.fields - Field methods (getAll, getIdByName, getById, getCustom, search)
 * - client.agile - Agile methods (getBoards, getSprints, getSprintIssues)
 * - client.links - Link type methods (getTypes, getType)
 *
 * @example
 * const client = new JiraClient({
 *   baseUrl: 'https://jira.example.com',
 *   token: process.env.JIRA_PERSONAL_TOKEN,
 * });
 *
 * // Get current user
 * const user = await client.users.getMyself();
 *
 * // Search issues
 * const result = await client.issues.search({ jql: 'project = PROJ' });
 *
 * // Get sprints for a board
 * const sprints = await client.agile.getSprints({ boardId: 123 });
 */
export class JiraClient {
  /** User-related API methods */
  public readonly users: UsersApi;

  /** Project-related API methods */
  public readonly projects: ProjectsApi;

  /** Issue-related API methods */
  public readonly issues: IssuesApi;

  /** Field-related API methods (with caching) */
  public readonly fields: FieldsApi;

  /** Agile API methods (boards, sprints) */
  public readonly agile: AgileApi;

  /** Issue link type methods */
  public readonly links: LinksApi;

  constructor(config: JiraClientConfig) {
    this.users = new UsersApi(config);
    this.projects = new ProjectsApi(config);
    this.issues = new IssuesApi(config);
    this.fields = new FieldsApi(config);
    this.agile = new AgileApi(config);
    this.links = new LinksApi(config);
  }

  /**
   * Test connectivity to the Jira server.
   * Returns the authenticated user if successful.
   */
  async testConnection(): Promise<{ success: boolean; user?: JiraUser; error?: string }> {
    try {
      const user = await this.users.getMyself();
      return { success: true, user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: message };
    }
  }
}

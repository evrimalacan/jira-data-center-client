import { BaseApi } from './base.js';
import type {
  JiraBoard,
  JiraBoardResponse,
  JiraSprint,
  JiraSprintResponse,
  JiraIssue,
  JiraSearchResponse,
  GetBoardsParams,
  GetSprintsParams,
  GetSprintIssuesParams,
} from '../types/index.js';

/**
 * Agile-related API methods (boards, sprints)
 * Uses /rest/agile/1.0 base path
 */
export class AgileApi extends BaseApi {
  /** Agile API base URL override */
  private get agileBase() {
    return `${this.baseUrl}/rest/agile/1.0`;
  }

  /**
   * Get all boards visible to the user.
   * Can filter by project, type, or name.
   */
  async getBoards(params?: GetBoardsParams): Promise<JiraBoard[]> {
    const allBoards: JiraBoard[] = [];
    let startAt = params?.startAt ?? 0;
    const maxResults = params?.maxResults ?? 50;

    // If maxResults specified, just fetch one page
    if (params?.maxResults) {
      const response = await this.client.get<JiraBoardResponse>('/board', {
        baseURL: this.agileBase,
        params: {
          ...(params.projectKeyOrId && { projectKeyOrId: params.projectKeyOrId }),
          ...(params.type && { type: params.type }),
          ...(params.name && { name: params.name }),
          startAt,
          maxResults,
        },
      });
      return response.data.values;
    }

    // Auto-paginate to get all boards
    while (true) {
      const response = await this.client.get<JiraBoardResponse>('/board', {
        baseURL: this.agileBase,
        params: {
          ...(params?.projectKeyOrId && { projectKeyOrId: params.projectKeyOrId }),
          ...(params?.type && { type: params.type }),
          ...(params?.name && { name: params.name }),
          startAt,
          maxResults: 50,
        },
      });

      allBoards.push(...response.data.values);

      if (response.data.isLast) {
        break;
      }

      startAt += response.data.values.length;
    }

    return allBoards;
  }

  /**
   * Get a specific board by ID
   */
  async getBoard(boardId: number): Promise<JiraBoard> {
    const response = await this.client.get<JiraBoard>(`/board/${boardId}`, {
      baseURL: this.agileBase,
    });
    return response.data;
  }

  /**
   * Get sprints for a board.
   * Can filter by state (future, active, closed).
   */
  async getSprints(params: GetSprintsParams): Promise<JiraSprint[]> {
    const { boardId, state, startAt = 0, maxResults } = params;
    const allSprints: JiraSprint[] = [];
    let currentStartAt = startAt;

    // If maxResults specified, just fetch one page
    if (maxResults) {
      const response = await this.client.get<JiraSprintResponse>(
        `/board/${boardId}/sprint`,
        {
          baseURL: this.agileBase,
          params: {
            ...(state && { state }),
            startAt: currentStartAt,
            maxResults,
          },
        },
      );
      return response.data.values;
    }

    // Auto-paginate to get all sprints
    while (true) {
      const response = await this.client.get<JiraSprintResponse>(
        `/board/${boardId}/sprint`,
        {
          baseURL: this.agileBase,
          params: {
            ...(state && { state }),
            startAt: currentStartAt,
            maxResults: 50,
          },
        },
      );

      allSprints.push(...response.data.values);

      if (response.data.isLast) {
        break;
      }

      currentStartAt += response.data.values.length;
    }

    return allSprints;
  }

  /**
   * Get issues in a sprint
   */
  async getSprintIssues(params: GetSprintIssuesParams): Promise<JiraSearchResponse<JiraIssue>> {
    const { sprintId, startAt = 0, maxResults = 50, fields, expand, jql } = params;

    let fieldsParam: string | undefined;
    if (Array.isArray(fields)) {
      fieldsParam = fields.join(',');
    } else if (fields) {
      fieldsParam = fields;
    }

    const response = await this.client.get<JiraSearchResponse<JiraIssue>>(
      `/sprint/${sprintId}/issue`,
      {
        baseURL: this.agileBase,
        params: {
          startAt,
          maxResults: Math.min(maxResults, 50),
          ...(fieldsParam && { fields: fieldsParam }),
          ...(expand && { expand }),
          ...(jql && { jql }),
        },
      },
    );
    return response.data;
  }
}

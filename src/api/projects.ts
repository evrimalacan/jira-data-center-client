import { BaseApi } from './base.js';
import type {
  JiraProject,
  GetProjectsParams,
  GetProjectParams,
} from '../types/index.js';

/**
 * Project-related API methods
 */
export class ProjectsApi extends BaseApi {
  /**
   * Get all projects visible to the authenticated user
   */
  async getAll(params?: GetProjectsParams): Promise<JiraProject[]> {
    const response = await this.client.get<JiraProject[]>('/project', {
      params: {
        ...(params?.expand && { expand: params.expand }),
        ...(params?.includeArchived && { includeArchived: params.includeArchived }),
      },
    });
    return response.data;
  }

  /**
   * Get a specific project by key or ID
   */
  async get(params: GetProjectParams): Promise<JiraProject> {
    const { projectKeyOrId, expand } = params;
    const response = await this.client.get<JiraProject>(`/project/${projectKeyOrId}`, {
      params: expand ? { expand } : {},
    });
    return response.data;
  }
}

import { BaseApi } from './base.js';
import type {
  JiraUser,
  GetMyselfParams,
  GetUserParams,
  SearchUsersParams,
} from '../types/index.js';

/**
 * User-related API methods
 */
export class UsersApi extends BaseApi {
  /**
   * Get the currently authenticated user
   */
  async getMyself(params?: GetMyselfParams): Promise<JiraUser> {
    const response = await this.client.get<JiraUser>('/myself', {
      params: params?.expand ? { expand: params.expand } : {},
    });
    return response.data;
  }

  /**
   * Get a user by username or key
   */
  async getUser(params: GetUserParams): Promise<JiraUser> {
    const { username, key, expand } = params;
    const response = await this.client.get<JiraUser>('/user', {
      params: {
        ...(username && { username }),
        ...(key && { key }),
        ...(expand && { expand }),
      },
    });
    return response.data;
  }

  /**
   * Search for users by username pattern
   */
  async searchUsers(params: SearchUsersParams): Promise<JiraUser[]> {
    const {
      username,
      startAt = 0,
      maxResults = 50,
      includeActive = true,
      includeInactive = false,
    } = params;

    const response = await this.client.get<JiraUser[]>('/user/search', {
      params: {
        username,
        startAt,
        maxResults,
        includeActive,
        includeInactive,
      },
    });
    return response.data;
  }
}

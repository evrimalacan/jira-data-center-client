import { BaseApi } from './base.js';
import type { JiraIssueLinkType, JiraLinkTypesResponse } from '../types/index.js';

/**
 * Issue link type API methods
 */
export class LinksApi extends BaseApi {
  /**
   * Get all available issue link types.
   * Link types define relationships between issues (e.g., "blocks", "duplicates", "relates to").
   */
  async getTypes(): Promise<JiraIssueLinkType[]> {
    const response = await this.client.get<JiraLinkTypesResponse>('/issueLinkType');
    return response.data.issueLinkTypes;
  }

  /**
   * Get a specific link type by ID
   */
  async getType(linkTypeId: string): Promise<JiraIssueLinkType> {
    const response = await this.client.get<JiraIssueLinkType>(`/issueLinkType/${linkTypeId}`);
    return response.data;
  }
}

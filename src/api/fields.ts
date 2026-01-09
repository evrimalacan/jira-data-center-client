import { BaseApi } from './base.js';
import type {
  JiraField,
  GetFieldsParams,
  FieldCache,
} from '../types/index.js';

/**
 * Field-related API methods with caching
 */
export class FieldsApi extends BaseApi {
  private cache: FieldCache | null = null;

  /**
   * Get all available fields (system + custom).
   * Results are cached; use refresh: true to force update.
   */
  async getAll(params?: GetFieldsParams): Promise<JiraField[]> {
    const refresh = params?.refresh ?? false;

    if (this.cache && !refresh) {
      return this.cache.fields;
    }

    const response = await this.client.get<JiraField[]>('/field');
    const fields = response.data;

    // Build name-to-ID mapping
    const nameToIdMap = new Map<string, string>();
    for (const field of fields) {
      nameToIdMap.set(field.name.toLowerCase(), field.id);
      nameToIdMap.set(field.id.toLowerCase(), field.id);
      if (field.clauseNames) {
        for (const clauseName of field.clauseNames) {
          nameToIdMap.set(clauseName.toLowerCase(), field.id);
        }
      }
    }

    this.cache = {
      fields,
      nameToIdMap,
      lastRefresh: Date.now(),
    };

    return fields;
  }

  /**
   * Get field ID by name (case-insensitive).
   * Uses cached field data; fetches if not cached.
   */
  async getIdByName(fieldName: string): Promise<string | null> {
    if (!this.cache) {
      await this.getAll();
    }
    const normalizedName = fieldName.toLowerCase();
    return this.cache?.nameToIdMap.get(normalizedName) ?? null;
  }

  /**
   * Get a field by its ID
   */
  async getById(fieldId: string): Promise<JiraField | null> {
    const fields = await this.getAll();
    return fields.find((f) => f.id === fieldId) ?? null;
  }

  /**
   * Get custom fields only
   */
  async getCustom(params?: GetFieldsParams): Promise<JiraField[]> {
    const fields = await this.getAll(params);
    return fields.filter((f) => f.id.startsWith('customfield_'));
  }

  /**
   * Search fields by keyword (fuzzy match on name)
   */
  async search(keyword: string, limit = 10): Promise<JiraField[]> {
    const fields = await this.getAll();
    const lowerKeyword = keyword.toLowerCase();

    const matches = fields.filter(
      (f) =>
        f.name.toLowerCase().includes(lowerKeyword) ||
        f.id.toLowerCase().includes(lowerKeyword),
    );

    return matches.slice(0, limit);
  }
}

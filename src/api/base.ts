import axios, { type AxiosInstance } from 'axios';
import type { JiraClientConfig } from '../types/common.js';

/**
 * Base API class providing axios client and shared configuration.
 * All domain-specific API classes extend this.
 */
export class BaseApi {
  protected client: AxiosInstance;
  protected baseUrl: string;

  constructor(config: JiraClientConfig) {
    const { token, baseUrl, axiosConfig = {} } = config;
    this.baseUrl = baseUrl;

    // Standard Jira API client (/rest/api/2)
    this.client = axios.create({
      ...axiosConfig,
      baseURL: `${baseUrl}/rest/api/2`,
      headers: {
        ...axiosConfig.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

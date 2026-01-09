import { JiraClient } from '../../src/index.js';

/**
 * Create a client from environment variables
 */
export function createClient(): JiraClient {
  const baseUrl = process.env.JIRA_URL;
  const token = process.env.JIRA_PERSONAL_TOKEN;

  if (!baseUrl || !token) {
    throw new Error(
      'Missing required environment variables: JIRA_URL and JIRA_PERSONAL_TOKEN',
    );
  }

  return new JiraClient({ baseUrl, token });
}

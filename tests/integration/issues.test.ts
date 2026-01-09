import { describe, it, expect } from 'vitest';
import { createClient } from './utils';

describe('Issues API', () => {
  const client = createClient();
  let firstIssueKey: string | undefined;

  it('should search issues with JQL (search)', async () => {
    const result = await client.issues.search({
      jql: 'ORDER BY created DESC',
      maxResults: 5,
    });
    expect(typeof result.total).toBe('number');
    expect(Array.isArray(result.issues)).toBe(true);
    if (result.issues.length > 0) {
      firstIssueKey = result.issues[0].key;
      expect(result.issues[0].key).toBeTruthy();
    }
  });

  it('should search issues with POST (searchPost)', async () => {
    const result = await client.issues.searchPost({
      jql: 'ORDER BY created DESC',
      maxResults: 5,
    });
    expect(typeof result.total).toBe('number');
    expect(Array.isArray(result.issues)).toBe(true);
  });

  it('should get a specific issue (get)', async () => {
    if (!firstIssueKey) {
      console.log('(skipped - no issues available)');
      return;
    }
    const issue = await client.issues.get({ issueKeyOrId: firstIssueKey });
    expect(issue.key).toBe(firstIssueKey);
    expect(issue.fields.summary).toBeTruthy();
  });

  it('should count issues (count)', async () => {
    const count = await client.issues.count('ORDER BY created DESC');
    expect(typeof count).toBe('number');
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('should get issue transitions (getTransitions)', async () => {
    if (!firstIssueKey) {
      console.log('(skipped - no issues available)');
      return;
    }
    const transitions = await client.issues.getTransitions({ issueKeyOrId: firstIssueKey });
    expect(Array.isArray(transitions.transitions)).toBe(true);
  });
});

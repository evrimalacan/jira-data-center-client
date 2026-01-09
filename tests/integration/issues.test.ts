import { createClient, assert, runTest } from './utils.js';

export async function testIssues(): Promise<void> {
  console.log('\n📋 Testing Issues API...');

  const client = createClient();

  let firstIssueKey: string | undefined;

  await runTest('issues.search', async () => {
    const result = await client.issues.search({
      jql: 'ORDER BY created DESC',
      maxResults: 5,
    });
    assert(typeof result.total === 'number', 'Should have total count');
    assert(Array.isArray(result.issues), 'Should have issues array');
    if (result.issues.length > 0) {
      firstIssueKey = result.issues[0].key;
      assert(result.issues[0].key, 'Issue should have a key');
    }
  });

  await runTest('issues.searchPost', async () => {
    const result = await client.issues.searchPost({
      jql: 'ORDER BY created DESC',
      maxResults: 5,
    });
    assert(typeof result.total === 'number', 'Should have total count');
    assert(Array.isArray(result.issues), 'Should have issues array');
  });

  await runTest('issues.get', async () => {
    if (!firstIssueKey) {
      // Skip if no issues found
      console.log('    (skipped - no issues available)');
      return;
    }
    const issue = await client.issues.get({ issueKeyOrId: firstIssueKey });
    assert(issue.key === firstIssueKey, 'Should return correct issue');
    assert(issue.fields.summary, 'Issue should have summary');
  });

  await runTest('issues.count', async () => {
    const count = await client.issues.count('ORDER BY created DESC');
    assert(typeof count === 'number', 'Count should be a number');
    assert(count >= 0, 'Count should be non-negative');
  });

  await runTest('issues.getTransitions', async () => {
    if (!firstIssueKey) {
      console.log('    (skipped - no issues available)');
      return;
    }
    const transitions = await client.issues.getTransitions({ issueKeyOrId: firstIssueKey });
    assert(Array.isArray(transitions.transitions), 'Should have transitions array');
  });
}

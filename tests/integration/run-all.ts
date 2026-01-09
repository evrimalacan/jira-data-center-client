#!/usr/bin/env npx tsx
/**
 * Integration test runner for Jira Data Center Client
 *
 * Run with: npx tsx tests/integration/run-all.ts
 *
 * Requires environment variables:
 *   JIRA_URL - Base URL of Jira server
 *   JIRA_PERSONAL_TOKEN - Personal Access Token
 */

import { printSummary, results } from './utils.js';
import { testUsers } from './users.test.js';
import { testProjects } from './projects.test.js';
import { testIssues } from './issues.test.js';
import { testFields } from './fields.test.js';
import { testAgile } from './agile.test.js';
import { testLinks } from './links.test.js';

async function main() {
  const baseUrl = process.env.JIRA_URL;
  const token = process.env.JIRA_PERSONAL_TOKEN;

  if (!baseUrl || !token) {
    console.error('Missing required environment variables:');
    console.error('  JIRA_URL:', baseUrl ? 'set' : 'MISSING');
    console.error('  JIRA_PERSONAL_TOKEN:', token ? 'set' : 'MISSING');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('Jira Data Center Client - Integration Tests');
  console.log('='.repeat(60));
  console.log(`Server: ${baseUrl}`);

  try {
    await testUsers();
    await testProjects();
    await testIssues();
    await testFields();
    await testAgile();
    await testLinks();
  } catch (error) {
    console.error('\nTest suite error:', error);
  }

  printSummary();

  // Exit with error if any tests failed
  const failed = results.filter((r) => !r.passed).length;
  process.exit(failed > 0 ? 1 : 0);
}

main();

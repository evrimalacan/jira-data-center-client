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

/**
 * Simple assertion helper
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

/**
 * Test result tracking
 */
export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export const results: TestResult[] = [];

/**
 * Run a test and track result
 */
export async function runTest(
  name: string,
  fn: () => Promise<void>,
): Promise<boolean> {
  try {
    await fn();
    results.push({ name, passed: true });
    console.log(`  ✓ ${name}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    results.push({ name, passed: false, error: message });
    console.log(`  ✗ ${name}: ${message}`);
    return false;
  }
}

/**
 * Print summary
 */
export function printSummary(): void {
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    console.log('\nFailed tests:');
    for (const result of results.filter((r) => !r.passed)) {
      console.log(`  - ${result.name}: ${result.error}`);
    }
  }

  console.log('='.repeat(60));
}

import { createClient, assert, runTest } from './utils.js';

export async function testProjects(): Promise<void> {
  console.log('\n📋 Testing Projects API...');

  const client = createClient();

  let firstProjectKey: string | undefined;

  await runTest('projects.getAll', async () => {
    const projects = await client.projects.getAll();
    assert(Array.isArray(projects), 'Should return array');
    assert(projects.length > 0, 'Should have at least one project');
    assert(projects[0].key, 'Project should have a key');
    firstProjectKey = projects[0].key;
  });

  await runTest('projects.get', async () => {
    if (!firstProjectKey) {
      throw new Error('No project key available from previous test');
    }
    const project = await client.projects.get({ projectKeyOrId: firstProjectKey });
    assert(project.key === firstProjectKey, 'Should return correct project');
    assert(project.name, 'Project should have a name');
  });
}

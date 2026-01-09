import { createClient, assert, runTest } from './utils.js';

export async function testFields(): Promise<void> {
  console.log('\n📋 Testing Fields API...');

  const client = createClient();

  await runTest('fields.getAll', async () => {
    const fields = await client.fields.getAll();
    assert(Array.isArray(fields), 'Should return array');
    assert(fields.length > 0, 'Should have fields');
    assert(fields[0].id, 'Field should have id');
    assert(fields[0].name, 'Field should have name');
  });

  await runTest('fields.getIdByName (summary)', async () => {
    const id = await client.fields.getIdByName('summary');
    assert(id === 'summary', 'Summary field ID should be "summary"');
  });

  await runTest('fields.getIdByName (Status)', async () => {
    const id = await client.fields.getIdByName('Status');
    assert(id, 'Should find Status field');
    // Status field ID varies by Jira instance
  });

  await runTest('fields.getById', async () => {
    const field = await client.fields.getById('summary');
    assert(field, 'Should find summary field');
    assert(field?.name.toLowerCase() === 'summary', 'Field name should be Summary');
  });

  await runTest('fields.getCustom', async () => {
    const customFields = await client.fields.getCustom();
    assert(Array.isArray(customFields), 'Should return array');
    // All should be custom fields
    for (const f of customFields) {
      assert(f.id.startsWith('customfield_'), 'Should only return custom fields');
    }
  });

  await runTest('fields.search', async () => {
    const matches = await client.fields.search('status');
    assert(Array.isArray(matches), 'Should return array');
    assert(matches.length > 0, 'Should find status-related fields');
  });
}

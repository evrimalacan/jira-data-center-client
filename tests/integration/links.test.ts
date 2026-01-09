import { createClient, assert, runTest } from './utils.js';

export async function testLinks(): Promise<void> {
  console.log('\n📋 Testing Links API...');

  const client = createClient();

  let firstLinkTypeId: string | undefined;

  await runTest('links.getTypes', async () => {
    const linkTypes = await client.links.getTypes();
    assert(Array.isArray(linkTypes), 'Should return array');
    assert(linkTypes.length > 0, 'Should have link types');
    console.log(`    Found ${linkTypes.length} link types`);

    // Verify structure
    const first = linkTypes[0];
    assert(first.id, 'Link type should have id');
    assert(first.name, 'Link type should have name');
    assert(first.inward, 'Link type should have inward description');
    assert(first.outward, 'Link type should have outward description');

    firstLinkTypeId = first.id;

    // Log all link types for reference
    for (const lt of linkTypes) {
      console.log(`    - ${lt.name}: "${lt.inward}" / "${lt.outward}"`);
    }
  });

  await runTest('links.getType', async () => {
    if (!firstLinkTypeId) {
      console.log('    (skipped - no link type available)');
      return;
    }
    const linkType = await client.links.getType(firstLinkTypeId);
    assert(linkType.id === firstLinkTypeId, 'Should return correct link type');
    assert(linkType.name, 'Link type should have name');
  });
}

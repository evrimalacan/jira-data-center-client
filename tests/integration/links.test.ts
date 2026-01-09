import { describe, it, expect } from 'vitest';
import { createClient } from './utils';

describe('Links API', () => {
  const client = createClient();
  let firstLinkTypeId: string | undefined;

  it('should get all link types (getTypes)', async () => {
    const linkTypes = await client.links.getTypes();
    expect(Array.isArray(linkTypes)).toBe(true);
    expect(linkTypes.length).toBeGreaterThan(0);
    console.log(`Found ${linkTypes.length} link types`);

    const first = linkTypes[0];
    expect(first.id).toBeTruthy();
    expect(first.name).toBeTruthy();
    expect(first.inward).toBeTruthy();
    expect(first.outward).toBeTruthy();

    firstLinkTypeId = first.id;

    for (const lt of linkTypes) {
      console.log(`- ${lt.name}: "${lt.inward}" / "${lt.outward}"`);
    }
  });

  it('should get a specific link type (getType)', async () => {
    if (!firstLinkTypeId) {
      console.log('(skipped - no link type available)');
      return;
    }
    const linkType = await client.links.getType(firstLinkTypeId);
    expect(linkType.id).toBe(firstLinkTypeId);
    expect(linkType.name).toBeTruthy();
  });
});

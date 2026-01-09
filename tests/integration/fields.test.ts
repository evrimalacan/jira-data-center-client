import { describe, it, expect } from 'vitest';
import { createClient } from './utils';

describe('Fields API', () => {
  const client = createClient();

  it('should get all fields (getAll)', async () => {
    const fields = await client.fields.getAll();
    expect(Array.isArray(fields)).toBe(true);
    expect(fields.length).toBeGreaterThan(0);
    expect(fields[0].id).toBeTruthy();
    expect(fields[0].name).toBeTruthy();
  });

  it('should get field ID by name - summary (getIdByName)', async () => {
    const id = await client.fields.getIdByName('summary');
    expect(id).toBe('summary');
  });

  it('should get field ID by name - Status (getIdByName)', async () => {
    const id = await client.fields.getIdByName('Status');
    expect(id).toBeTruthy();
  });

  it('should get field by ID (getById)', async () => {
    const field = await client.fields.getById('summary');
    expect(field).toBeTruthy();
    expect(field?.name.toLowerCase()).toBe('summary');
  });

  it('should get custom fields only (getCustom)', async () => {
    const customFields = await client.fields.getCustom();
    expect(Array.isArray(customFields)).toBe(true);
    for (const f of customFields) {
      expect(f.id.startsWith('customfield_')).toBe(true);
    }
  });

  it('should search fields (search)', async () => {
    const matches = await client.fields.search('status');
    expect(Array.isArray(matches)).toBe(true);
    expect(matches.length).toBeGreaterThan(0);
  });
});

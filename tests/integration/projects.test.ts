import { describe, it, expect } from 'vitest';
import { createClient } from './utils';

describe('Projects API', () => {
  const client = createClient();
  let firstProjectKey: string;

  it('should get all projects (getAll)', async () => {
    const projects = await client.projects.getAll();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].key).toBeTruthy();
    firstProjectKey = projects[0].key;
  });

  it('should get a specific project (get)', async () => {
    expect(firstProjectKey).toBeTruthy();
    const project = await client.projects.get({ projectKeyOrId: firstProjectKey });
    expect(project.key).toBe(firstProjectKey);
    expect(project.name).toBeTruthy();
  });
});

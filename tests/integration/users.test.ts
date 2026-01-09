import { describe, it, expect } from 'vitest';
import { createClient } from './utils';

describe('Users API', () => {
  const client = createClient();

  it('should get current user (getMyself)', async () => {
    const user = await client.users.getMyself();
    expect(user.name).toBeTruthy();
    expect(user.displayName).toBeTruthy();
  });

  it('should get user by username (getUser)', async () => {
    const myself = await client.users.getMyself();
    const user = await client.users.getUser({ username: myself.name });
    expect(user.name).toBe(myself.name);
  });

  it('should search users (searchUsers)', async () => {
    const myself = await client.users.getMyself();
    const searchTerm = myself.name.slice(0, 3);
    const users = await client.users.searchUsers({ username: searchTerm });
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
});

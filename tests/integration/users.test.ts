import { createClient, assert, runTest } from './utils.js';

export async function testUsers(): Promise<void> {
  console.log('\n📋 Testing Users API...');

  const client = createClient();

  await runTest('users.getMyself', async () => {
    const user = await client.users.getMyself();
    assert(user.name, 'User should have a name');
    assert(user.displayName, 'User should have a displayName');
  });

  await runTest('users.getUser', async () => {
    const myself = await client.users.getMyself();
    const user = await client.users.getUser({ username: myself.name });
    assert(user.name === myself.name, 'Should return same user');
  });

  await runTest('users.searchUsers', async () => {
    const myself = await client.users.getMyself();
    // Search for first 3 chars of username
    const searchTerm = myself.name.slice(0, 3);
    const users = await client.users.searchUsers({ username: searchTerm });
    assert(Array.isArray(users), 'Should return array');
    assert(users.length > 0, 'Should find at least one user');
  });
}

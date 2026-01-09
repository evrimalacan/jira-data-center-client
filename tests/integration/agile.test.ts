import { createClient, assert, runTest } from './utils.js';

export async function testAgile(): Promise<void> {
  console.log('\n📋 Testing Agile API...');

  const client = createClient();

  let scrumBoardId: number | undefined;

  await runTest('agile.getBoards', async () => {
    const boards = await client.agile.getBoards({ maxResults: 50 });
    assert(Array.isArray(boards), 'Should return array');
    console.log(`    Found ${boards.length} boards`);

    // Find a scrum board for sprint testing
    const scrumBoard = boards.find((b) => b.type === 'scrum');
    if (scrumBoard) {
      scrumBoardId = scrumBoard.id;
      console.log(`    Using scrum board: ${scrumBoard.name} (ID: ${scrumBoard.id})`);
    }
  });

  await runTest('agile.getBoards (filtered by type)', async () => {
    const scrumBoards = await client.agile.getBoards({ type: 'scrum', maxResults: 10 });
    assert(Array.isArray(scrumBoards), 'Should return array');
    for (const board of scrumBoards) {
      assert(board.type === 'scrum', 'Should only return scrum boards');
    }
  });

  await runTest('agile.getBoard', async () => {
    if (!scrumBoardId) {
      console.log('    (skipped - no scrum board available)');
      return;
    }
    const board = await client.agile.getBoard(scrumBoardId);
    assert(board.id === scrumBoardId, 'Should return correct board');
    assert(board.name, 'Board should have name');
  });

  await runTest('agile.getSprints', async () => {
    if (!scrumBoardId) {
      console.log('    (skipped - no scrum board available)');
      return;
    }
    const sprints = await client.agile.getSprints({ boardId: scrumBoardId, maxResults: 10 });
    assert(Array.isArray(sprints), 'Should return array');
    console.log(`    Found ${sprints.length} sprints`);

    if (sprints.length > 0) {
      assert(sprints[0].id, 'Sprint should have id');
      assert(sprints[0].name, 'Sprint should have name');
      assert(sprints[0].state, 'Sprint should have state');
    }
  });

  await runTest('agile.getSprints (active only)', async () => {
    if (!scrumBoardId) {
      console.log('    (skipped - no scrum board available)');
      return;
    }
    const activeSprints = await client.agile.getSprints({
      boardId: scrumBoardId,
      state: 'active',
      maxResults: 10,
    });
    assert(Array.isArray(activeSprints), 'Should return array');
    for (const sprint of activeSprints) {
      assert(sprint.state === 'active', 'Should only return active sprints');
    }
  });
}

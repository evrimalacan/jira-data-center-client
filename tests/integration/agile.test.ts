import { describe, it, expect } from 'vitest';
import { createClient } from './utils';

describe('Agile API', () => {
  const client = createClient();
  let scrumBoardId: number | undefined;

  it('should get all boards (getBoards)', async () => {
    const boards = await client.agile.getBoards({ maxResults: 50 });
    expect(Array.isArray(boards)).toBe(true);
    console.log(`Found ${boards.length} boards`);

    const scrumBoard = boards.find((b) => b.type === 'scrum');
    if (scrumBoard) {
      scrumBoardId = scrumBoard.id;
      console.log(`Using scrum board: ${scrumBoard.name} (ID: ${scrumBoard.id})`);
    }
  });

  it('should filter boards by type (getBoards)', async () => {
    const scrumBoards = await client.agile.getBoards({ type: 'scrum', maxResults: 10 });
    expect(Array.isArray(scrumBoards)).toBe(true);
    for (const board of scrumBoards) {
      expect(board.type).toBe('scrum');
    }
  });

  it('should get a specific board (getBoard)', async () => {
    if (!scrumBoardId) {
      console.log('(skipped - no scrum board available)');
      return;
    }
    const board = await client.agile.getBoard(scrumBoardId);
    expect(board.id).toBe(scrumBoardId);
    expect(board.name).toBeTruthy();
  });

  it('should get sprints for a board (getSprints)', async () => {
    if (!scrumBoardId) {
      console.log('(skipped - no scrum board available)');
      return;
    }
    const sprints = await client.agile.getSprints({ boardId: scrumBoardId, maxResults: 10 });
    expect(Array.isArray(sprints)).toBe(true);
    console.log(`Found ${sprints.length} sprints`);

    if (sprints.length > 0) {
      expect(sprints[0].id).toBeTruthy();
      expect(sprints[0].name).toBeTruthy();
      expect(sprints[0].state).toBeTruthy();
    }
  });

  it('should filter sprints by state (getSprints)', async () => {
    if (!scrumBoardId) {
      console.log('(skipped - no scrum board available)');
      return;
    }
    const activeSprints = await client.agile.getSprints({
      boardId: scrumBoardId,
      state: 'active',
      maxResults: 10,
    });
    expect(Array.isArray(activeSprints)).toBe(true);
    for (const sprint of activeSprints) {
      expect(sprint.state).toBe('active');
    }
  });
});

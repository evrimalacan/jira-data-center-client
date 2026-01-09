# Jira Data Center Client

TypeScript client for Jira Server/Data Center REST API.

## Installation

```bash
npm install jira-data-center-client
```

## Usage

```typescript
import { JiraClient } from 'jira-data-center-client';

const client = new JiraClient({
  token: process.env.JIRA_PERSONAL_TOKEN,
  baseUrl: 'https://jira.example.com'
});

// Get current user
const myself = await client.users.getMyself();
console.log('Connected as:', myself.displayName);

// Search issues with JQL
const result = await client.issues.search({
  jql: 'project = PROJ AND issuetype = Bug',
  maxResults: 50,
});

// Get issue details
const issue = await client.issues.get({
  issueKeyOrId: 'PROJ-123',
  expand: 'changelog',
});

// Discover custom field ID
const severityFieldId = await client.fields.getIdByName('Severity');

// Get boards and sprints
const boards = await client.agile.getBoards({ type: 'scrum' });
const sprints = await client.agile.getSprints({ boardId: boards[0].id });

// Get issue link types
const linkTypes = await client.links.getTypes();
```

## API Structure

All methods are organized by domain:

| Domain | Methods |
|--------|---------|
| `client.users` | `getMyself`, `getUser`, `searchUsers` |
| `client.projects` | `getAll`, `get` |
| `client.issues` | `search`, `searchPost`, `get`, `searchAll`, `count`, `getTransitions` |
| `client.fields` | `getAll`, `getIdByName`, `getById`, `getCustom`, `search` |
| `client.agile` | `getBoards`, `getBoard`, `getSprints`, `getSprintIssues` |
| `client.links` | `getTypes`, `getType` |

## Example: Custom Field Access

```typescript
// Discover the Severity custom field
const severityFieldId = await client.fields.getIdByName('Severity');

// Search for issues
const jql = 'project = SDM AND issuetype IN (Bug, "Sub-Bug")';
const issues = await client.issues.searchAll({ jql }, 5000);

// Access custom fields
for (const issue of issues) {
  const severity = issue.fields[severityFieldId as `customfield_${string}`];
  console.log(`${issue.key}: Severity = ${severity}`);
}
```

## Example: Agile Boards and Sprints

```typescript
// Get all scrum boards
const scrumBoards = await client.agile.getBoards({ type: 'scrum' });

// Get active sprints for a board
const activeSprints = await client.agile.getSprints({
  boardId: scrumBoards[0].id,
  state: 'active',
});

// Get issues in a sprint
const sprintIssues = await client.agile.getSprintIssues({
  sprintId: activeSprints[0].id,
});
```

## Authentication

Generate a Personal Access Token in Jira: **Profile > Personal Access Tokens > Create token**

Set environment variables:
```bash
export JIRA_URL=https://jira.example.com
export JIRA_PERSONAL_TOKEN=your-token-here
```

## Requirements

- Node.js >= 18.0.0
- Jira Server/Data Center 7.0+

## API Endpoints

This client uses:
- Jira REST API v2: `/rest/api/2`
- Agile REST API: `/rest/agile/1.0`

Authentication: Bearer token (Personal Access Token)

## License

MIT

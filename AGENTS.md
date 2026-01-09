# AGENTS.md

Guidance for coding agents working with this repository.

## Project Overview

TypeScript client library for Jira Server/Data Center REST API. ESM-only package using axios.

## Commands

```bash
npm run build           # Compile TypeScript to dist/
npm run clean           # Remove dist/
npm test                # Run all tests (Vitest)
npm run test:integration # Run integration tests against live Jira
```

## Project Structure

```
src/
├── api/                    # Domain API classes
│   ├── index.ts            # Re-exports all APIs
│   ├── base.ts             # BaseApi with axios client
│   ├── users.ts            # UsersApi
│   ├── projects.ts         # ProjectsApi
│   ├── issues.ts           # IssuesApi
│   ├── fields.ts           # FieldsApi (with caching)
│   ├── agile.ts            # AgileApi (boards, sprints)
│   └── links.ts            # LinksApi
├── types/                  # TypeScript type definitions
│   ├── index.ts            # Re-exports all types
│   ├── common.ts           # JiraClientConfig, JiraSearchResponse
│   ├── user.ts             # JiraUser + params
│   ├── project.ts          # JiraProject + params
│   ├── issue.ts            # JiraIssue, JiraIssueFields + params
│   ├── field.ts            # JiraField, FieldCache + params
│   ├── transition.ts       # JiraTransition + params
│   ├── agile.ts            # JiraBoard, JiraSprint + params
│   └── link.ts             # JiraIssueLinkType + params
├── client.ts               # JiraClient facade (composes all APIs)
└── index.ts                # Public exports

tests/
└── integration/            # Integration tests (Vitest)
    ├── utils.ts            # Test utilities
    ├── users.test.ts
    ├── projects.test.ts
    ├── issues.test.ts
    ├── fields.test.ts
    ├── agile.test.ts
    └── links.test.ts
```

## Architecture

**Pattern**: Composition with Facade

- `BaseApi` - Base class with shared axios client
- Domain APIs (`UsersApi`, `IssuesApi`, etc.) - Extend `BaseApi`
- `JiraClient` - Facade that composes all domain APIs

```typescript
// Usage
const client = new JiraClient({ baseUrl, token });
client.users.getMyself();      // UsersApi
client.issues.search({ jql }); // IssuesApi
client.agile.getBoards();      // AgileApi
```

**Single axios client** with `baseURL` override for Agile API:
- REST API: `/rest/api/2`
- Agile API: `/rest/agile/1.0`

## Adding New Methods

1. Add types to `src/types/<domain>.ts`
2. Add method to `src/api/<domain>.ts`
3. Export from `src/types/index.ts` and `src/api/index.ts` if new file
4. Add integration test in `tests/integration/<domain>.test.ts`
5. Run `npm run build && npm run test:integration`

## Adding New API Domain

1. Create `src/types/<domain>.ts` with interfaces
2. Create `src/api/<domain>.ts` extending `BaseApi`
3. Add `export * from './<domain>.js'` to both index files
4. Add property to `JiraClient` in `src/client.ts`
5. Create `tests/integration/<domain>.test.ts`

## Commit Convention

- Present tense ("Add feature" not "Added feature")
- Concise subject line
- Optional short description on new line
- No signatures or co-author tags

## Jira DC REST API Reference

### Base URLs
- REST API: `/rest/api/2`
- Agile API: `/rest/agile/1.0`

### Authentication
```
Authorization: Bearer <personal-access-token>
```

### Pagination
- `startAt`: Starting index (0-based)
- `maxResults`: Page size (max 50 for DC)
- Response includes `total` for total count

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/myself` | GET | Get authenticated user |
| `/user?username=X` | GET | Get user by username |
| `/user/search?username=X` | GET | Search users |
| `/project` | GET | List all projects |
| `/project/{key}` | GET | Get project details |
| `/search` | GET/POST | JQL issue search |
| `/issue/{key}` | GET | Get issue details |
| `/issue/{key}/transitions` | GET | Get available transitions |
| `/field` | GET | List all fields |
| `/issueLinkType` | GET | List issue link types |

### Agile Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/board` | GET | List boards |
| `/board/{id}` | GET | Get board |
| `/board/{id}/sprint` | GET | List sprints for board |
| `/sprint/{id}/issue` | GET | Get sprint issues |

### JQL Examples

```sql
-- Bugs in a project
project = PROJ AND issuetype = Bug

-- Issues by custom field (Severity Level)
project = PROJ AND cf[11120] = "P1"

-- Issues created in date range
project = PROJ AND created >= "2024-01-01" AND created <= "2024-12-31"

-- Issues by creator (team vs non-team)
project = PROJ AND creator NOT IN ("user1", "user2")

-- Issues by assignee
project = PROJ AND assignee IN ("user1", "user2")
```

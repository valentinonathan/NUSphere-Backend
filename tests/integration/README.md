# Jest + Supertest integration test suite

## Overview

This test suite exercises the Express application through real HTTP requests using Supertest. The tests target the actual route, middleware, controller, database, and response flow without starting a real network server.

## Test strategy

- Each test uses the Express app directly via Supertest.
- The suite uses the dedicated test database connection from TEST_DATABASE_URL.
- The database is reset before each test to keep the suite isolated and deterministic.
- The tests verify both the HTTP response and the database state after each request.

## Covered areas

| Area | Endpoint(s) | What is tested |
| --- | --- | --- |
| Authentication | POST /auth/login, POST /auth/signup/create-account | Successful login, unknown-user failure, malformed request handling, DB persistence for account creation |
| Users | GET /users/:id, GET /users/username/:username | Authentication enforcement, successful profile lookup |
| Posts | POST /posts | Successful post creation, invalid input without image |
| Comments | POST /comments/:postId | Successful comment creation, missing comment validation |
| Events | POST /events | Successful event creation, missing required fields |
| Friend requests | POST /friend-requests/:receiverId | Successful request creation, invalid action handling |
| Modules | POST /modules/:moduleCode/attendance | Successful attendance tracking, unknown module failure |

## Current status

The suite was executed successfully against the test database.

| Test file | Status |
| --- | --- |
| tests/auth.api.test.js | Passing |
| tests/user.api.test.js | Passing |
| tests/post.api.test.js | Passing |
| tests/comment.api.test.js | Passing |
| tests/event.api.test.js | Passing |
| tests/friend.api.test.js | Passing |
| tests/module.api.test.js | Passing |

Test Suites: 7 passed, 7 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        12.932 s

## Running the suite

```bash
node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runInBand --config jest.config.cjs --runTestsByPath tests/integration/auth.api.test.js tests/integration/user.api.test.js tests/integration/post.api.test.js tests/integration/comment.api.test.js tests/integration/event.api.test.js tests/integration/friend.api.test.js tests/integration/module.api.test.js
```

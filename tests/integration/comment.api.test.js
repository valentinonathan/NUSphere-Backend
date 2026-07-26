import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser } from './helpers/db.js';
import db from '../../src/db/index.js';

beforeEach(async () => {
  await resetDatabase();
});

describe('Comment API integration', () => {
  it('creates a comment and persists it to the database', async () => {
    const user = await createUser({ username: 'comment.user' });
    await db.query('INSERT INTO posts (user_id, url, caption) VALUES ($1, $2, $3)', [user.id, 'https://example.com/post.png', 'seed']);

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'comment.user', password: 'Password123' });

    const response = await agent.post('/comments/1').send({ comment: 'A great comment' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Comment successfully posted');

    const rows = await db.query('SELECT content FROM comments WHERE post_id = $1', [1]);
    expect(rows.rows[0].content).toBe('A great comment');
  });

  it('rejects a missing comment body', async () => {
    const user = await createUser({ username: 'comment.user2' });
    await db.query('INSERT INTO posts (user_id, url, caption) VALUES ($1, $2, $3)', [user.id, 'https://example.com/post.png', 'seed']);

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'comment.user2', password: 'Password123' });

    const response = await agent.post('/comments/1').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Comment field is missing');
  });
});

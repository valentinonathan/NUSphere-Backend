import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser } from './helpers/db.js';
import db from '../../src/db/index.js';

beforeEach(async () => {
  await resetDatabase();
});

describe('Post API integration', () => {
  it('creates a post for an authenticated user and stores it in the database', async () => {
    await createUser({ username: 'post.user' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'post.user', password: 'Password123' });

    const response = await agent
      .post('/posts')
      .field('caption', 'Hello from Jest')
      .attach('image', Buffer.from('fake-image'), { filename: 'test.png', contentType: 'image/png' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created successfully');

    const rows = await db.query('SELECT caption FROM posts');
    expect(rows.rows[0].caption).toBe('Hello from Jest');
  });

  it('rejects a post without an image', async () => {
    await createUser({ username: 'post.user2' });
    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'post.user2', password: 'Password123' });

    const response = await agent.post('/posts').send({ caption: 'Missing image' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Image file is required');
  });
});

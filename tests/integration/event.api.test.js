import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser } from './helpers/db.js';
import db from '../../src/db/index.js';

beforeEach(async () => {
  await resetDatabase();
});

describe('Event API integration', () => {
  it('creates an event and persists it to the database', async () => {
    await createUser({ username: 'event.user' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'event.user', password: 'Password123' });

    const response = await agent
      .post('/events')
      .field('title', 'Study Group')
      .field('description', 'Revision session')
      .field('location', 'UTown')
      .field('start_time', '2030-01-02T10:00:00')
      .attach('image', Buffer.from('fake-image'), { filename: 'event.png', contentType: 'image/png' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Event created');

    const rows = await db.query('SELECT title FROM events');
    expect(rows.rows[0].title).toBe('Study Group');
  });

  it('rejects an event missing required fields', async () => {
    await createUser({ username: 'event.user2' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'event.user2', password: 'Password123' });

    const response = await agent.post('/events').send({ title: 'Only title' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Missing required fields');
  });
});

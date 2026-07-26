import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser } from './helpers/db.js';
import db from '../../src/db/test.js';

beforeEach(async () => {
  await resetDatabase();
});

describe('Friend request API integration', () => {
  it('creates a friend request and persists it in the database', async () => {
    const sender = await createUser({ username: 'friend.sender' });
    const receiver = await createUser({ username: 'friend.receiver' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'friend.sender', password: 'Password123' });

    const response = await agent.post(`/friend-requests/${receiver.id}`).send({ action: 'Request' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('requestSuccess');

    const rows = await db.query('SELECT sender_id, receiver_id FROM friend_requests');
    expect(rows.rows[0]).toEqual({ sender_id: sender.id, receiver_id: receiver.id });
  });

  it('rejects an invalid action value', async () => {
    const receiver = await createUser({ username: 'friend.receiver2' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'friend.receiver2', password: 'Password123' });

    const response = await agent.post(`/friend-requests/${receiver.id}`).send({ action: 'BadAction' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Action field should be either Request, Unfriend, or Unsend Request');
  });
});

import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser } from './helpers/db.js';

beforeEach(async () => {
  await resetDatabase();
});

describe('User API integration', () => {
  it('returns a 401 when the user is not authenticated', async () => {
    const response = await request(app).get('/users/username/test-user');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authenticated (no token)');
  });

  it('returns user details for an authenticated user', async () => {
    const created = await createUser({ username: 'user.lookup' });

    const agent = request.agent(app);
    const loginResponse = await agent
      .post('/auth/login')
      .send({ username: 'user.lookup', password: 'Password123' });

    const response = await agent.get(`/users/id/${created.id}`);

    expect(loginResponse.status).toBe(200);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('user.lookup');
  });
});

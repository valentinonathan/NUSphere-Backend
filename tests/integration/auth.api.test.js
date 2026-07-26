import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser } from './helpers/db.js';
import jwt from 'jsonwebtoken';

beforeEach(async () => {
  await resetDatabase();
});

describe('Auth API integration', () => {
  it('logs in an existing user and returns a token', async () => {
    await createUser({ username: 'auth.user' });

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'auth.user', password: 'Password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    const payload = jwt.verify(response.body.token, process.env.JWT_PASSWORD);
    expect(payload.userId).toBeDefined();
  });

  it('rejects login for an unknown user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'missing.user', password: 'Password123' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Username not found');
  });

  it('rejects malformed signup payloads', async () => {
    const response = await request(app)
      .post('/auth/signup/create-account')
      .send({ username: 'bad', password: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it('creates an account and stores it in the database', async () => {
    const response = await request(app)
      .post('/auth/signup/create-account')
      .send({ firstName: 'Ada', lastName: 'Lovelace', username: 'ada_new', password: 'Password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    const rows = await import('../../src/db/index.js').then(({ default: db }) => db.query('SELECT username FROM users WHERE username = $1', ['ada_new']));
    expect(rows.rows[0].username).toBe('ada_new');
  });
});

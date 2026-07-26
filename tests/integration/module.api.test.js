import request from 'supertest';
import app from '../../src/app.js';
import { resetDatabase, createUser, seedModule } from './helpers/db.js';
import db from '../../src/db/test.js';

beforeEach(async () => {
  await resetDatabase();
  await seedModule('CS2030S');
});

describe('Module API integration', () => {
  it('attaches a user to a module and persists the attendance record', async () => {
    await createUser({ username: 'module.user' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'module.user', password: 'Password123' });

    const response = await agent.post('/modules/CS2030S/attendance');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post attendance successful');

    const rows = await db.query('SELECT module_id, user_id FROM modules_attendance');
    expect(rows.rows[0].user_id).toBeDefined();
  });

  it('rejects attendance for an unknown module code', async () => {
    await createUser({ username: 'module.user2' });

    const agent = request.agent(app);
    await agent.post('/auth/login').send({ username: 'module.user2', password: 'Password123' });

    const response = await agent.post('/modules/CS9999/attendance');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Module code not found');
  });
});

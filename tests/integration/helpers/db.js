import db from '../../../src/db/test.js';

export async function resetDatabase() {
  await db.query(`
    TRUNCATE TABLE
      likes,
      comments,
      posts,
      friend_requests,
      friends,
      events_attendance,
      events,
      modules_attendance,
      replies,
      reply_upvote,
      reply_downvote,
      thread_upvote,
      thread_downvote,
      threads,
      modules,
      users
    RESTART IDENTITY CASCADE
  `);
}

export async function seedModule(moduleCode = 'CS2030S') {
  const result = await db.query(
    `INSERT INTO modules (title, banner_url, atendees)
     VALUES ($1, $2, $3)
     RETURNING id, title`,
    [moduleCode, 'https://example.com/banner.png', 0]
  );
  return result.rows[0];
}

export async function createUser({ username, firstName = 'Test', lastName = 'User', password = 'Password123' }) {
  const hashedPassword = await import('bcrypt').then(({ default: bcrypt }) => bcrypt.hash(password, 10));
  const result = await db.query(
    `INSERT INTO users (username, first_name, last_name, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username`,
    [username, firstName, lastName, hashedPassword]
  );
  return result.rows[0];
}

export async function getUserRowById(userId) {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}

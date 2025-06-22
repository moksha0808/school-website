// netlify/functions/list-students.js
// Returns all student applicants from Neon Postgres

const { Pool } = require('@neondatabase/serverless');

exports.handler = async function(event, context) {
  // Optional: Simple admin auth (e.g., via header)
  const ADMIN_KEY = process.env.ADMIN_KEY;
  // Support both Netlify and local env variable names
  const DATABASE_URL = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (ADMIN_KEY && event.headers['x-admin-key'] !== ADMIN_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  if (!DATABASE_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database URL not set in environment' })
    };
  }

  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  } finally {
    await pool.end();
  }
};

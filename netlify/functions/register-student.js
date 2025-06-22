const { Client } = require('pg');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(
      'INSERT INTO students (name, email) VALUES ($1, $2)',
      [name, email]
    );
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Student registered successfully!' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database error', error: err.message })
    };
  }
};

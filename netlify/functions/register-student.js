const { Client } = require('pg');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { fullName, email, phone, class: studentClass, parent, notes } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(
      `INSERT INTO students (full_name, email, phone, class, parent, notes)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [fullName, email, phone, studentClass, parent, notes]
    );
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Application submitted successfully!' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database error', error: err.message })
    };
  }
};

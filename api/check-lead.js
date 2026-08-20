import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ig_handle } = req.body;
  if (!ig_handle) {
    return res.status(400).json({ error: 'Instagram handle is required' });
  }

  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`
    SELECT claimed_by_name, created_at
    FROM leads
    WHERE ig_handle = ${ig_handle.toLowerCase().replace('@', '')}
  `;

  if (result.length > 0) {
    return res.status(200).json({
      available: false,
      claimed_by_name: result[0].claimed_by_name,
      claimed_at: result[0].created_at,
    });
  } else {
    return res.status(200).json({ available: true });
  }
}
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ig_handle, tg_id, tg_name } = req.body || {};
  if (!ig_handle || !tg_id || !tg_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return res.status(200).json({ success: true, message: 'Demo mode: Claimed lead successfully' });
  }

  try {
    const sql = neon(dbUrl);
    await sql`
      INSERT INTO leads (ig_handle, claimed_by_tg_id, claimed_by_name)
      VALUES (${ig_handle.toLowerCase().replace('@', '')}, ${tg_id}, ${tg_name})
      ON CONFLICT (ig_handle) DO NOTHING
    `;

    const result = await sql`
      SELECT 1 FROM leads WHERE ig_handle = ${ig_handle.toLowerCase().replace('@', '')}
    `;

    if (result.length > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'Lead already claimed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Database error' });
  }
}

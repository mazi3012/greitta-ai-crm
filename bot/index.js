import { Telegraf } from 'telegraf';
import { neon } from '@neondatabase/serverless';

const bot = new Telegraf(process.env.BOT_TOKEN);
const sql = neon(process.env.DATABASE_URL);

bot.command('start', (ctx) => {
  ctx.reply('Welcome to InstaLead TG-CRM! Use /claim @coach_name to claim a lead.');
});

bot.command('claim', async (ctx) => {
  const igHandle = ctx.message.text.split(' ')[1];
  if (!igHandle) {
    return ctx.reply('Please provide an Instagram handle (e.g., /claim @coach_name).');
  }

  const initData = ctx.update.message.from;
  const tgId = initData.id;
  const tgName = initData.first_name;

  try {
    await sql`
      INSERT INTO leads (ig_handle, claimed_by_tg_id, claimed_by_name)
      VALUES (${igHandle.toLowerCase().replace('@', '')}, ${tgId}, ${tgName})
      ON CONFLICT (ig_handle) DO NOTHING
    `;

    const result = await sql`
      SELECT 1 FROM leads WHERE ig_handle = ${igHandle.toLowerCase().replace('@', '')}
    `;

    if (result.length > 0) {
      ctx.reply(`✅ Lead ${igHandle} claimed successfully!`);
    } else {
      ctx.reply(`❌ Lead ${igHandle} is already claimed.`);
    }
  } catch (error) {
    ctx.reply('❌ Failed to claim lead. Please try again.');
  }
});

export default async function handler(req, res) {
  await bot.handleUpdate(req.body, res);
}
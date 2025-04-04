export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { name, wallet, message, txHash, chain, method } = req.body;

  // Basic validation
  if (!name || !wallet || !message || !txHash || !chain || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram credentials in environment variables.');
    return res.status(500).json({ error: 'Telegram credentials not configured' });
  }

  const text = `
🚨 *New Crypto Report Submission*
-----------------------------------
🧾 *Name:* ${name}
💼 *Wallet:* \`${wallet}\`
📝 *Message:* ${message}
🔗 *Tx Hash:* \`${txHash}\`
🌐 *Chain:* ${chain.toUpperCase()}
🛠 *Method:* ${method}
  `;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) {
      const errorData = await telegramRes.text();
      console.error('Telegram API failed:', errorData);
      return res.status(500).json({ error: 'Failed to send to Telegram' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected Telegram Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

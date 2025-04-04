Perfect. Here's your next file:

---
### ✅ `/pages/api/report.js`
```js
// pages/api/report.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { name, wallet, message, txHash, chain, method } = req.body;

  const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.VITE_TELEGRAM_CHAT_ID;

  const text = `
🚨 *New Crypto Report Submission*
-----------------------------------
🧾 *Name:* ${name}
💼 *Wallet:* ${wallet}
📝 *Message:* ${message}
🔗 *Tx Hash:* ${txHash}
🌐 *Chain:* ${chain.toUpperCase()}
🛠 *Method:* ${method}
`;

  const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const telegramRes = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) throw new Error('Telegram API failed');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Telegram Error:', err);
    return res.status(500).json({ error: 'Failed to send to Telegram' });
  }
}

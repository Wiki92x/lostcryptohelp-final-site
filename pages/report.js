// pages/api/report.js

// Import necessary modules
import fetch from 'node-fetch';

// Handler function for the report endpoint
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // Destructure the request body
  const { name, wallet, message, txHash, chain, method } = req.body;

  // Validate required fields
  if (!name || !wallet || !message || !txHash || !chain || !method) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Destructure environment variables
  const { VITE_TELEGRAM_BOT_TOKEN: botToken, VITE_TELEGRAM_CHAT_ID: chatId } = process.env;

  // Construct the message text
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

  // Construct the Telegram API URL
  const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    // Send the message to Telegram
    const telegramRes = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    // Check if the Telegram API request was successful
    if (!telegramRes.ok) throw new Error('Telegram API failed');

    // Respond with success
    return res.status(200).json({ success: true });
  } catch (err) {
    // Log the error and respond with an error message
    console.error('Telegram Error:', err);
    return res.status(500).json({ error: 'Failed to send to Telegram' });
  }
}

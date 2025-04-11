// pages/api/report.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, wallet, message, txHash, chain, method } = req.body;

  if (!wallet || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // TODO: Save to DB, send to Telegram, or process however you like
    console.log('Received report:', { name, wallet, message, txHash, chain, method });

    // Example success response
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}

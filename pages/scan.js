// pages/api/scan.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { wallet } = req.body;
  
    if (!wallet) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
  
    // Simulated scan logic (replace with real logic)
    const result = {
      wallet,
      riskScore: Math.floor(Math.random() * 100),
      status: 'Scan complete',
      timestamp: new Date().toISOString(),
    };
  
    return res.status(200).json(result);
  }
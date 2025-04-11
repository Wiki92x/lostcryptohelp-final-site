// pages/api/deepscan.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain } = req.body;
  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });

  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== '1') {
      return res.status(500).json({ error: 'Etherscan fetch failed', message: data.message });
    }

    const txs = data.result.slice(0, 10);
    return res.status(200).json({ wallet, chain, transfers: txs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

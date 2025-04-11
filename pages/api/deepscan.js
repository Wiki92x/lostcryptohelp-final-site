const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain } = req.body;

  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });

  let apiKey = '';
  let baseUrl = '';

  if (chain === 'eth') {
    apiKey = process.env.ETHERSCAN_API_KEY;
    baseUrl = 'https://api.etherscan.io';
  } else if (chain === 'bsc') {
    apiKey = process.env.BSCSCAN_API_KEY;
    baseUrl = 'https://api.bscscan.com';
  } else {
    return res.status(400).json({ error: 'Unsupported chain' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key in environment' });
  }

  try {
    const url = `${baseUrl}/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data.status !== '1') {
      console.error('Etherscan raw error:', data);
      return res.status(500).json({ error: 'Etherscan fetch failed', message: data.message });
    }

    return res.status(200).json({ transactions: data.result.slice(0, 10) });
  } catch (e) {
    console.error('Server exception:', e);
    return res.status(500).json({ error: 'Internal Server Error', message: e.message });
  }
}

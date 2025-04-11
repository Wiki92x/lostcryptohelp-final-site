import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain } = req.body;

  if (!wallet || !chain) {
    return res.status(400).json({ error: 'Missing wallet or chain' });
  }

  let apiKey = '';
  let baseUrl = '';
  let chainId = 0;

  if (chain === 'eth') {
    apiKey = process.env.ETHERSCAN_API_KEY;
    baseUrl = 'https://api.etherscan.io';
    chainId = 1;
  } else if (chain === 'bsc') {
    apiKey = process.env.BSCSCAN_API_KEY;
    baseUrl = 'https://api.bscscan.com';
    chainId = 56;
  } else {
    return res.status(400).json({ error: 'Only ETH and BSC supported for now' });
  }

  const url = `${baseUrl}/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const txRes = await fetch(url);
    const txData = await txRes.json();

    if (txData.status !== '1') {
      return res.status(500).json({ error: 'Etherscan fetch failed', message: txData.message });
    }

    const transfers = txData.result.slice(0, 10);
    return res.status(200).json({ transfers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
}

// pages/api/verify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { txHash, chain } = req.body;
  if (!txHash || !chain) {
    return res.status(400).json({ error: 'Missing transaction hash or chain' });
  }

  try {
    const normalizedChain = chain.toLowerCase();

    if (normalizedChain === 'eth') {
      const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
      const url = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === '1' && data.result.status === '1') {
        return res.status(200).json({ success: true });
      }
    }

    else if (normalizedChain === 'bsc') {
      const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY;
      const url = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BSCSCAN_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === '1' && data.result.status === '1') {
        return res.status(200).json({ success: true });
      }
    }

    else if (normalizedChain === 'tron') {
      const url = `https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.contractRet === 'SUCCESS') {
        return res.status(200).json({ success: true });
      }
    }

    return res.status(400).json({ success: false, error: 'Transaction not found or not confirmed' });

  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

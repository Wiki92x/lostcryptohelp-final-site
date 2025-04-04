// ✅ Fixed version of /pages/api/verify.js with correct async handling for Netlify SSR context
// No direct use of `res.status()` as this is NOT a regular Node server route in Netlify's static build.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const { txHash, chain } = req.body;

  if (!txHash || !chain) {
    res.status(400).json({ success: false, error: 'Missing txHash or chain' });
    return;
  }

  let apiURL = '';
  let valid = false;

  try {
    if (chain === 'ETH') {
      apiURL = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    } else if (chain === 'BNB') {
      apiURL = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.BSCSCAN_API_KEY}`;
    } else if (chain === 'TRON') {
      apiURL = `https://api.tronscan.org/api/transaction-info?hash=${txHash}`;
    } else {
      res.status(400).json({ success: false, error: 'Unsupported chain' });
      return;
    }

    const response = await fetch(apiURL);
    const data = await response.json();

    if (chain === 'TRON') {
      valid = data.confirmed && data.contractRet === 'SUCCESS';
    } else {
      valid = data.status === '1' || data.result?.status === '1';
    }

    res.status(200).json({ success: valid });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

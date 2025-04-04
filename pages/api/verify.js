// pages/api/verify.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { txHash, chain } = req.body;

  if (!txHash || !chain) {
    return res.status(400).json({ success: false, error: 'Missing txHash or chain' });
  }

  let apiURL = '';
  let valid = false;

  try {
    if (chain === 'ETH') {
      apiURL = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    } else if (chain === 'BNB') {
      apiURL = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.BSCSCAN_API_KEY}`;
    } else if (chain === 'TRON') {
      apiURL = `https://api.trongrid.io/v1/transactions/${txHash}`;
    } else {
      return res.status(400).json({ success: false, error: 'Unsupported chain' });
    }

    const response = await fetch(apiURL);
    const data = await response.json();

    if (chain === 'TRON') {
      valid = data && data.data && data.data[0] && data.data[0].contractRet === 'SUCCESS';
    } else {
      valid = data.result && data.result.status === '1';
    }

    return res.status(200).json({ success: valid });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ success: false, error: 'Verification error' });
  }
}

// pages/api/verify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { txHash, chain } = req.body;

  if (!txHash || !chain) {
    return res.status(400).json({ success: false, error: 'Missing transaction hash or chain' });
  }

  try {
    let url = '';
    if (chain === 'ETH') {
      url = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=0e3b31d6035e43c9acfdd2d82dc42af5`;
    } else if (chain === 'BNB') {
      url = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=UHDMFCT2K6CUAY28PJ2VP43U582EM9KSNB`;
    } else if (chain === 'TRON') {
      url = `https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`;
    } else {
      return res.status(400).json({ success: false, error: 'Unsupported chain' });
    }

    const response = await fetch(url);
    const data = await response.json();

    let success = false;

    if (chain === 'TRON') {
      success = data && data.hash;
    } else {
      success = data?.result?.status === '1';
    }

    if (success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false, error: 'Transaction not found or failed' });
    }
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}

// pages/api/deepscan.js
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

  switch (chain.toLowerCase()) {
    case 'eth':
      apiKey = process.env.ETHERSCAN_API_KEY;
      baseUrl = 'https://api.etherscan.io';
      chainId = 1;
      break;
    case 'bsc':
      apiKey = process.env.BSCSCAN_API_KEY;
      baseUrl = 'https://api.bscscan.com';
      chainId = 56;
      break;
    case 'tron':
      return res.status(400).json({ error: 'TRON not supported in this scan yet' });
    default:
      return res.status(400).json({ error: 'Unsupported chain' });
  }

  const scanUrl = `${baseUrl}/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const txRes = await fetch(scanUrl);
    const txData = await txRes.json();

    if (txData.status !== '1') {
      return res.status(500).json({ error: 'Etherscan fetch failed', message: txData.message });
    }

    const transfers = txData.result.slice(0, 10);
    const detailed = [];

    for (const tx of transfers) {
      const token = tx.contractAddress.toLowerCase();
      const riskRes = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${token}`);
      const riskData = await riskRes.json();
      const riskFlags = riskData.result?.[token] || {};

      detailed.push({
        token: tx.tokenName,
        symbol: tx.tokenSymbol,
        value: parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal),
        from: tx.from,
        to: tx.to,
        hash: tx.hash,
        contract: token,
        risk_flags: riskFlags,
      });
    }

    return res.status(200).json({ wallet, chain, transfers: detailed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

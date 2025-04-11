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

  if (chain.toLowerCase() !== 'eth') {
    return res.status(400).json({ error: 'Only Ethereum is supported in this phase.' });
  }

  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

  try {
    const txRes = await fetch(url);
    const txData = await txRes.json();

    if (txData.status !== '1') {
      return res.status(500).json({ error: 'Etherscan fetch failed', message: txData.message });
    }

    const transfers = txData.result.slice(0, 10);
    const enriched = [];

    for (const tx of transfers) {
      const tokenAddress = tx.contractAddress.toLowerCase();
      const goplusUrl = `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${tokenAddress}`;

      const goplusRes = await fetch(goplusUrl);
      const goplusData = await goplusRes.json();
      const riskFlags = goplusData.result?.[tokenAddress] || {};

      enriched.push({
        token: tx.tokenName,
        symbol: tx.tokenSymbol,
        value: parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal),
        from: tx.from,
        to: tx.to,
        hash: tx.hash,
        contract: tokenAddress,
        risk_flags: riskFlags,
      });
    }

    return res.status(200).json({
      wallet,
      chain,
      transfers: enriched,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}


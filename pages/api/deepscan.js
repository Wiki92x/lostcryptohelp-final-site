import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain } = req.body;

  if (!wallet || !chain) {
    return res.status(400).json({ error: 'Missing wallet or chain' });
  }

  let apiKey;
  let baseUrl;

  switch (chain.toLowerCase()) {
    case 'eth':
      apiKey = process.env.ETHERSCAN_API_KEY;
      baseUrl = 'https://api.etherscan.io';
      break;
    case 'bsc':
      apiKey = process.env.BSCSCAN_API_KEY;
      baseUrl = 'https://api.bscscan.com';
      break;
    default:
      return res.status(400).json({ error: 'Unsupported chain' });
  }

  const apiURL = `${baseUrl}/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.status !== '1') {
      return res.status(500).json({ error: 'Etherscan fetch failed', message: data.result });
    }

    const topTransfers = data.result.slice(0, 10);
    const transfersWithRisk = [];

    for (const tx of topTransfers) {
      const tokenAddress = tx.contractAddress.toLowerCase();
      const goPlusURL = `https://api.gopluslabs.io/api/v1/token_security/${chain === 'eth' ? '1' : '56'}?contract_addresses=${tokenAddress}`;

      const securityRes = await fetch(goPlusURL);
      const securityData = await securityRes.json();
      const riskData = securityData.result?.[tokenAddress] || {};

      transfersWithRisk.push({
        token: tx.tokenName,
        symbol: tx.tokenSymbol,
        value: parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal),
        from: tx.from,
        to: tx.to,
        hash: tx.hash,
        contract: tokenAddress,
        risk_flags: riskData,
      });
    }

    return res.status(200).json({
      wallet,
      chain,
      transfers: transfersWithRisk,
    });
  } catch (err) {
    console.error('Scan failed:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

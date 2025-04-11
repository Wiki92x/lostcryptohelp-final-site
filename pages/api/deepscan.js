import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet, chain } = req.body;

  if (!wallet || !chain) {
    return res.status(400).json({ error: 'Missing wallet or chain' });
  }

  let apiKey = '';
  let explorerURL = '';

  // Choose correct API
  if (chain === 'eth') {
    apiKey = process.env.ETHERSCAN_API_KEY!;
    explorerURL = `https://api.etherscan.io/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  } else if (chain === 'bsc') {
    apiKey = process.env.BSCSCAN_API_KEY!;
    explorerURL = `https://api.bscscan.com/api?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
  } else if (chain === 'tron') {
    return res.status(400).json({ error: 'TRON chain not yet supported in this endpoint' });
  } else {
    return res.status(400).json({ error: 'Unsupported chain' });
  }

  try {
    const explorerRes = await fetch(explorerURL);
    const explorerData = await explorerRes.json();

    if (explorerData.status !== '1') {
      console.error('etherscan response:', explorerData);
      return res.status(500).json({ error: 'Etherscan fetch failed', message: explorerData.result });
    }

    const transfers = explorerData.result.slice(0, 10); // Limit for performance

    // Fetch token risk flags from GoPlus
    const enriched = await Promise.all(transfers.map(async (tx: any) => {
      const contract = tx.contractAddress.toLowerCase();
      const goplusRes = await fetch(`https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contract}`);
      const goplusData = await goplusRes.json();
      const risk = goplusData?.result?.[contract] || {};

      return {
        tokenName: tx.tokenName,
        tokenSymbol: tx.tokenSymbol,
        contractAddress: tx.contractAddress,
        value: parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal),
        from: tx.from,
        to: tx.to,
        hash: tx.hash,
        risk_flags: risk,
      };
    }));

    return res.status(200).json({
      wallet,
      chain,
      transfers: enriched,
    });
  } catch (err: any) {
    console.error('DeepScan API error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}

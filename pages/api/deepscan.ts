import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet, chain } = req.body;

  if (!wallet || !chain) return res.status(400).json({ error: 'Missing wallet or chain' });

  const apiKeys: Record<string, string> = {
    eth: process.env.ETHERSCAN_API_KEY!,
    bsc: process.env.BSCSCAN_API_KEY!,
    tron: process.env.TRONSCAN_API_KEY!,
  };

  const baseUrls: Record<string, string> = {
    eth: 'https://api.etherscan.io/api',
    bsc: 'https://api.bscscan.com/api',
    tron: 'https://apilist.tronscan.org/api/transaction',
  };

  try {
    if (chain === 'tron') {
      const tronRes = await fetch(`${baseUrls.tron}?sort=-timestamp&count=true&limit=10&start=0&address=${wallet}`);
      const data = await tronRes.json();

      return res.status(200).json({ wallet, chain, transfers: data.data || [] });
    }

    const url = `${baseUrls[chain]}?module=account&action=tokentx&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKeys[chain]}`;
    const etherscanRes = await fetch(url);
    const etherscanData = await etherscanRes.json();

    if (etherscanData.status !== '1') {
      return res.status(500).json({ error: 'Scan failed', message: etherscanData.message });
    }

    const topTransfers = etherscanData.result.slice(0, 10);
    const transfers: {
      token: string;
      symbol: string;
      value: number;
      from: string;
      to: string;
      hash: string;
      contract: string;
      risk_flags: any;
    }[] = [];

    for (const tx of topTransfers) {
      const contract = tx.contractAddress.toLowerCase();
      const riskRes = await fetch(`https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contract}`);
      const riskData = await riskRes.json();
      const riskFlags = riskData.result?.[contract] || {};

      transfers.push({
        token: tx.tokenName,
        symbol: tx.tokenSymbol,
        value: parseFloat(tx.value) / 10 ** parseInt(tx.tokenDecimal),
        from: tx.from,
        to: tx.to,
        hash: tx.hash,
        contract,
        risk_flags: riskFlags,
      });
    }

    return res.status(200).json({ wallet, chain, transfers });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}

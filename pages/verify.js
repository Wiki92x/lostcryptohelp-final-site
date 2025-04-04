// pages/api/verify.js
import fetch from 'node-fetch';

const PRICE_USD = {
  ETH: 1.5,
  BNB: 0.5,
  TRON: 0.5,
};

const getPrice = async (symbol) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
  const data = await res.json();
  return data?.[symbol]?.usd || null;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { txHash, chain } = req.body;
  if (!txHash || !chain) return res.status(400).json({ error: 'Missing txHash or chain' });

  const CHAIN_MAP = {
    ETH: {
      api: `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.ETHERSCAN_API_KEY}`,
      to: process.env.VERIFY_ETH_ADDRESS,
      priceId: 'ethereum',
    },
    BNB: {
      api: `https://api.bscscan.com/api?module=account&action=txlistinternal&txhash=${txHash}&apikey=${process.env.BSCSCAN_API_KEY}`,
      to: process.env.VERIFY_BNB_ADDRESS,
      priceId: 'binancecoin',
    },
    TRON: {
      api: `https://api.trongrid.io/wallet/gettransactionbyid`,
      priceId: 'tron',
      to: process.env.VERIFY_TRON_ADDRESS,
    }
  };

  const chainData = CHAIN_MAP[chain];
  if (!chainData) return res.status(400).json({ error: 'Invalid chain' });

  try {
    let response;
    if (chain === 'TRON') {
      response = await fetch(chainData.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: txHash }),
      });
    } else {
      response = await fetch(chainData.api);
    }

    const txData = await response.json();
    const priceUSD = await getPrice(chainData.priceId);

    const expectedUSD = PRICE_USD[chain];
    const expectedAmount = 1 / priceUSD * expectedUSD; // Convert USD fee to token amount

    // Basic check placeholder: You should match tx.to === expected wallet & value >= expectedAmount
    const success = txData.status === '1' || txData?.result === '1';
    if (success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'TX not confirmed or invalid' });
    }
  } catch (err) {
    console.error('[VERIFY ERROR]', err);
    return res.status(500).json({ error: 'Verification error' });
  }
}

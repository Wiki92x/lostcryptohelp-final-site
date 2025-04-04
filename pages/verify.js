import fetch from 'node-fetch';

const RECEIVER_ADDRESS = {
  eth: '0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D',
  bsc: '0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D',
  tron: 'TM6HGn9p9ZEo525PATPZanYCA4W9nQezTv',
};

const REQUIRED_USD = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0.5,
};

const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;
const BSCSCAN_API = process.env.BSCSCAN_API_KEY;
const TRONSCAN_API = process.env.TRONSCAN_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { txHash, chain } = req.body;
  if (!txHash || !chain) return res.status(400).json({ error: 'Missing txHash or chain' });

  const lowerChain = chain.toLowerCase();
  let priceUSD = 0;
  let requiredTokenAmount = 0;

  try {
    // 1. Get live token price
    if (lowerChain === 'eth') {
      const resETH = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API}`);
      const { result } = await resETH.json();
      priceUSD = parseFloat(result.ethusd);
    } else if (lowerChain === 'bsc') {
      const resBSC = await fetch(`https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${BSCSCAN_API}`);
      const { result } = await resBSC.json();
      priceUSD = parseFloat(result.ethusd);
    } else if (lowerChain === 'tron') {
      const resTRON = await fetch('https://apilist.tronscanapi.com/api/system/status');
      const data = await resTRON.json();
      priceUSD = parseFloat(data.data.marketPrice);
    } else {
      return res.status(400).json({ success: false, error: 'Unsupported chain' });
    }

    const requiredUSD = REQUIRED_USD[lowerChain];
    requiredTokenAmount = requiredUSD / priceUSD;

    // 2. Validate the transaction
    let isValid = false;

    if (lowerChain === 'eth') {
      const tx = await fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${ETHERSCAN_API}`);
      const { result } = await tx.json();
      const to = result?.to?.toLowerCase();
      const value = parseInt(result?.value, 16) / 1e18;
      isValid = to === RECEIVER_ADDRESS.eth.toLowerCase() && value >= requiredTokenAmount;
    } else if (lowerChain === 'bsc') {
      const tx = await fetch(`https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${BSCSCAN_API}`);
      const { result } = await tx.json();
      const to = result?.to?.toLowerCase();
      const value = parseInt(result?.value, 16) / 1e18;
      isValid = to === RECEIVER_ADDRESS.bsc.toLowerCase() && value >= requiredTokenAmount;
    } else if (lowerChain === 'tron') {
      const tx = await fetch(`https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`);
      const result = await tx.json();
      const to = result.toAddress;
      const amount = result.contractData?.amount / 1e6;
      isValid = to === RECEIVER_ADDRESS.tron && amount >= requiredTokenAmount;
    }

    return res.status(200).json({
      success: isValid,
      tokenPrice: priceUSD,
      requiredTokenAmount: requiredTokenAmount.toFixed(6),
      receivedEnough: isValid,
    });

  } catch (err) {
    console.error('[VERIFY ERROR]', err);
    return res.status(500).json({ success: false, error: 'Verification failed' });
  }
}

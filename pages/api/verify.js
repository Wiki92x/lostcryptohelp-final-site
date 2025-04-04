import fetch from 'node-fetch';

const REQUIRED_USD = {
  eth: 1.5,
  bsc: 0.5,
  tron: 0.5,
};

const RECEIVER_ADDRESS = {
  eth: process.env.VERIFY_ETH_ADDRESS,
  bsc: process.env.VERIFY_BNB_ADDRESS,
  tron: process.env.VERIFY_TRON_ADDRESS,
};

const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;
const BSCSCAN_API = process.env.BSCSCAN_API_KEY;
const TRONSCAN_API = process.env.TRONSCAN_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Only POST allowed' });
  }

  const { txHash, chain } = req.body;

  if (!txHash || !chain) {
    return res.status(400).json({ success: false, error: 'Missing txHash or chain' });
  }

  const lowerChain = chain.toLowerCase();
  let priceUSD = 0;
  let tokenAmount = 0;
  let isValid = false;

  try {
    // 1. Fetch live token price in USD
    if (lowerChain === 'eth') {
      const priceRes = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API}`);
      const priceData = await priceRes.json();
      priceUSD = parseFloat(priceData.result.ethusd);
    } else if (lowerChain === 'bsc') {
      const priceRes = await fetch(`https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${BSCSCAN_API}`);
      const priceData = await priceRes.json();
      priceUSD = parseFloat(priceData.result.ethusd);
    } else if (lowerChain === 'tron') {
      const priceRes = await fetch('https://apilist.tronscanapi.com/api/system/status');
      const priceData = await priceRes.json();
      priceUSD = parseFloat(priceData.data.trxPriceUSD);
    } else {
      return res.status(400).json({ success: false, error: 'Unsupported chain' });
    }

    const requiredUSD = REQUIRED_USD[lowerChain];
    const receiver = RECEIVER_ADDRESS[lowerChain];
    const requiredTokenAmount = (requiredUSD / priceUSD).toFixed(6);

    // 2. Verify transaction
    if (lowerChain === 'eth') {
      const txRes = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${receiver}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API}`);
      const txData = await txRes.json();
      const match = txData.result.find(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && tx.to.toLowerCase() === receiver.toLowerCase());
      if (match && match.isError === '0' && parseFloat(match.value) / 1e18 >= requiredTokenAmount) {
        isValid = true;
      }
    } else if (lowerChain === 'bsc') {
      const txRes = await fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${receiver}&startblock=0&endblock=99999999&sort=desc&apikey=${BSCSCAN_API}`);
      const txData = await txRes.json();
      const match = txData.result.find(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && tx.to.toLowerCase() === receiver.toLowerCase());
      if (match && match.isError === '0' && parseFloat(match.value) / 1e18 >= requiredTokenAmount) {
        isValid = true;
      }
    } else if (lowerChain === 'tron') {
      const txRes = await fetch(`https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`);
      const txData = await txRes.json();
      if (txData && txData.toAddress === receiver && parseFloat(txData.contractData.amount_str) / 1e6 >= requiredTokenAmount) {
        isValid = true;
      }
    }

    return res.status(200).json({
      success: isValid,
      required: requiredTokenAmount,
      paid: isValid,
      token: lowerChain,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ success: false, error: 'Verification failed', details: error.message });
  }
}

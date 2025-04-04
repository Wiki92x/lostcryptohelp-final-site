// pages/api/verify.js
import fetch from 'node-fetch';

const RECEIVER_ADDRESS = {
  eth: process.env.VERIFY_ETH_ADDRESS,
  bsc: process.env.VERIFY_BNB_ADDRESS,
  tron: process.env.VERIFY_TRON_ADDRESS,
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { txHash, chain } = req.body;
  if (!txHash || !chain) {
    return res.status(400).json({ error: 'Missing txHash or chain' });
  }

  const lowerChain = chain.toLowerCase();
  let priceUSD = 0;
  let requiredAmount = 0;
  let paidAmount = 0;
  let isPaid = false;

  try {
    // STEP 1: Fetch live price
    if (lowerChain === 'eth') {
      const resETH = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API}`);
      const { result } = await resETH.json();
      priceUSD = parseFloat(result.ethusd);
    } else if (lowerChain === 'bsc') {
      const resBSC = await fetch(`https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${BSCSCAN_API}`);
      const { result } = await resBSC.json();
      priceUSD = parseFloat(result.ethusd);
    } else if (lowerChain === 'tron') {
      const resTRON = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
      const data = await resTRON.json();
      priceUSD = parseFloat(data.tron.usd);
    } else {
      return res.status(400).json({ error: 'Unsupported chain' });
    }

    // STEP 2: Fetch transaction details
    if (lowerChain === 'eth') {
      const txRes = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${RECEIVER_ADDRESS.eth}&apikey=${ETHERSCAN_API}`);
      const { result } = await txRes.json();
      const tx = result.find((t) => t.hash === txHash);
      if (tx && tx.to.toLowerCase() === RECEIVER_ADDRESS.eth.toLowerCase()) {
        paidAmount = parseFloat(tx.value) / 1e18;
      }
    } else if (lowerChain === 'bsc') {
      const txRes = await fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${RECEIVER_ADDRESS.bsc}&apikey=${BSCSCAN_API}`);
      const { result } = await txRes.json();
      const tx = result.find((t) => t.hash === txHash);
      if (tx && tx.to.toLowerCase() === RECEIVER_ADDRESS.bsc.toLowerCase()) {
        paidAmount = parseFloat(tx.value) / 1e18;
      }
    } else if (lowerChain === 'tron') {
      const txRes = await fetch(`https://api.trongrid.io/v1/transactions/${txHash}`);
      const data = await txRes.json();
      const tx = data.data[0];
      if (tx && tx.raw_data.contract[0].parameter.value.contract_address.toLowerCase() === RECEIVER_ADDRESS.tron.toLowerCase()) {
        paidAmount = parseFloat(tx.raw_data.contract[0].parameter.value.amount) / 1e6;
      }
    }

    // STEP 3: Fee validation
    requiredAmount = +(REQUIRED_USD[lowerChain] / priceUSD).toFixed(6);
    isPaid = paidAmount >= requiredAmount;

    return res.status(200).json({
      success: isPaid,
      paidAmount,
      requiredAmount,
      token: lowerChain.toUpperCase(),
      usdFee: REQUIRED_USD[lowerChain],
    });
  } catch (error) {
    console.error('Verification Error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
}

// pages/api/verify.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { txHash, chain } = req.body;

  if (!txHash || !chain) {
    return res.status(400).json({ error: 'Missing txHash or chain' });
  }

  let isValid = false;

  try {
    if (chain === 'ETH') {
      const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;
      const VERIFY_ADDRESS = process.env.VERIFY_ETH_ADDRESS;

      const response = await fetch(`https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETHERSCAN_API}`);
      const data = await response.json();

      const txDetails = await fetch(`https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${txHash}&apikey=${ETHERSCAN_API}`);
      const txData = await txDetails.json();

      if (data.result?.status === '1' && txData.result?.[0]?.to?.toLowerCase() === VERIFY_ADDRESS.toLowerCase()) {
        isValid = true;
      }
    }

    if (chain === 'BNB') {
      const BSC_API = process.env.BSCSCAN_API_KEY;
      const VERIFY_ADDRESS = process.env.VERIFY_BNB_ADDRESS;

      const response = await fetch(`https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BSC_API}`);
      const data = await response.json();

      const txDetails = await fetch(`https://api.bscscan.com/api?module=account&action=txlistinternal&txhash=${txHash}&apikey=${BSC_API}`);
      const txData = await txDetails.json();

      if (data.result?.status === '1' && txData.result?.[0]?.to?.toLowerCase() === VERIFY_ADDRESS.toLowerCase()) {
        isValid = true;
      }
    }

    if (chain === 'TRON') {
      const TRON_API = process.env.TRONSCAN_API_KEY;
      const VERIFY_ADDRESS = process.env.VERIFY_TRON_ADDRESS;

      const response = await fetch(`https://api.trongrid.io/v1/transactions/${txHash}`, {
        headers: { 'TRON-PRO-API-KEY': TRON_API }
      });
      const data = await response.json();

      const txTo = data?.data?.[0]?.raw_data?.contract?.[0]?.parameter?.value?.to_address;
      const decodedTo = txTo ? hexToBase58(txTo) : null;

      if (data?.data?.[0]?.ret?.[0]?.contractRet === 'SUCCESS' && decodedTo === VERIFY_ADDRESS) {
        isValid = true;
      }
    }

    if (isValid) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }

  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper for TRON address decoding
function hexToBase58(hex) {
  const base58 = require('bs58');
  const addressBytes = Buffer.from(hex, 'hex');
  const prefix = Buffer.from([0x41]);
  const full = Buffer.concat([prefix, addressBytes]);
  return base58.encode(full);
}

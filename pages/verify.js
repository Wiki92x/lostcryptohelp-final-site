// pages/api/verify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { txHash, chain } = req.body;
  const receivingWallet = {
    ETH: process.env.VERIFY_ETH_ADDRESS,
    BNB: process.env.VERIFY_BNB_ADDRESS,
    TRON: process.env.VERIFY_TRON_ADDRESS,
  };

  const ETH_API = process.env.ETHERSCAN_API_KEY;
  const BSC_API = process.env.BSCSCAN_API_KEY;
  const TRON_API = process.env.TRONSCAN_API_KEY;

  try {
    let url = '', to = '', status = false;

    if (chain === 'ETH') {
      url = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETH_API}`;
      const { status: txStatus } = (await fetch(url).then(r => r.json())).result;
      status = txStatus === '1';

      const txInfoUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${ETH_API}`;
      const txRes = await fetch(txInfoUrl).then(r => r.json());
      to = txRes?.result?.to?.toLowerCase();
    }

    else if (chain === 'BNB') {
      url = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BSC_API}`;
      const { status: txStatus } = (await fetch(url).then(r => r.json())).result;
      status = txStatus === '1';

      const txInfoUrl = `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${BSC_API}`;
      const txRes = await fetch(txInfoUrl).then(r => r.json());
      to = txRes?.result?.to?.toLowerCase();
    }

    else if (chain === 'TRON') {
      const txRes = await fetch(`https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`, {
        headers: { 'TRON-PRO-API-KEY': TRON_API },
      }).then(r => r.json());

      to = txRes?.toAddress?.toLowerCase();
      status = txRes?.contractRet === 'SUCCESS';
    }

    const expected = receivingWallet[chain]?.toLowerCase();
    if (status && to === expected) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false, reason: 'Mismatch or pending' });
    }

  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ error: 'Verification failed' });
  }
}

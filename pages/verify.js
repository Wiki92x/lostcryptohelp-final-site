// pages/api/verify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { txHash, chain } = req.body;

  if (!txHash || !chain) {
    return res.status(400).json({ error: 'Missing txHash or chain' });
  }

  try {
    let isValid = false;
    const wallet = '0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D'; // Your ETH + BNB receiving wallet
    const tronWallet = 'TM6HGn9p9ZEo525PATPZanYCA4W9nQezTv'; // Your TRON receiving wallet

    if (chain === 'ETH' || chain === 'BNB') {
      const baseUrl =
        chain === 'ETH'
          ? 'https://api.etherscan.io/api'
          : 'https://api.bscscan.com/api';
      const apiKey = process.env.ETHERSCAN_API_KEY || process.env.BSCSCAN_API_KEY;

      const url = `${baseUrl}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${apiKey}`;
      const txInfoUrl = `${baseUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`;

      const [receiptRes, txRes] = await Promise.all([
        fetch(url).then((r) => r.json()),
        fetch(txInfoUrl).then((r) => r.json()),
      ]);

      const toAddress = txRes?.result?.to?.toLowerCase();
      const success = receiptRes?.result?.status === '1';

      isValid = success && toAddress === wallet.toLowerCase();
    }

    if (chain === 'TRON') {
      const tronRes = await fetch(`https://apilist.tronscan.org/api/transaction-info?hash=${txHash}`);
      const data = await tronRes.json();

      const toAddress = data?.contractData?.to_address;
      const success = data?.contractRet === 'SUCCESS';

      isValid = success && toAddress === tronWallet;
    }

    if (isValid) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid or unmatched transaction' });
    }
  } catch (err) {
    console.error('TX VERIFY ERROR:', err);
    return res.status(500).json({ error: 'Internal error verifying transaction' });
  }
}

// pages/api/verify.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { txHash, network } = req.body;
  if (!txHash || !network) {
    return res.status(400).json({ error: 'Missing transaction hash or network' });
  }

  const chain = network.toLowerCase();
  const ethOrBnbAddress = '0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D'.toLowerCase();
  const tronAddress = 'TM6HGn9p9ZEo525PATPZanYCA4W9nQezTv';

  try {
    if (chain === 'tron') {
      const url = `https://apilist.tronscanapi.com/api/transaction-info?hash=${txHash}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.contractRet === 'SUCCESS' && data.toAddress === tronAddress) {
        return res.status(200).json({ verified: true });
      } else {
        throw new Error('TRON transaction not valid or not sent to correct address');
      }
    }

    if (chain === 'bsc') {
      const url = `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=UHDMFCT2K6CUAY28PJ2VP43U582EM9KSNB`;
      const response = await fetch(url);
      const data = await response.json();
      const tx = data.result;
      if (tx && tx.to && tx.to.toLowerCase() === ethOrBnbAddress) {
        return res.status(200).json({ verified: true });
      } else {
        throw new Error('BSC transaction not valid or not sent to correct address');
      }
    }

    if (chain === 'eth') {
      const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=0e3b31d6035e43c9acfdd2d82dc42af5`;
      const response = await fetch(url);
      const data = await response.json();
      const tx = data.result;
      if (tx && tx.to && tx.to.toLowerCase() === ethOrBnbAddress) {
        return res.status(200).json({ verified: true });
      } else {
        throw new Error('Ethereum transaction not valid or not sent to correct address');
      }
    }

    throw new Error('Unsupported chain or validation logic not implemented');
  } catch (error) {
    return res.status(400).json({ verified: false, error: error.message });
  }
}

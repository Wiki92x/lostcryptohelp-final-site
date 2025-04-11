const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

  const testWallet = '0x6a160Bb6a9Bea759b43De6ce735978992ad81b7D';
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${testWallet}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    console.log('etherscan response:', data);

    if (data.status !== '1') {
      return res.status(500).json({ error: 'Etherscan fetch failed', message: data.message });
    }

    return res.status(200).json({ txns: data.result });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
}

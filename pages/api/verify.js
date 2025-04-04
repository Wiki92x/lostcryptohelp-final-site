// ✅ Final pages/api/verify.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  const { txHash, chain } = await req.json();

  if (!txHash || !chain) {
    return Response.json({ success: false, error: 'Missing txHash or chain' }, { status: 400 });
  }

  const ETH_API = process.env.ETHERSCAN_API_KEY;
  const BSC_API = process.env.BSCSCAN_API_KEY;
  const TRON_API = process.env.TRONSCAN_API_KEY;

  const ETH_WALLET = process.env.VERIFY_ETH_ADDRESS.toLowerCase();
  const BNB_WALLET = process.env.VERIFY_BNB_ADDRESS.toLowerCase();
  const TRON_WALLET = process.env.VERIFY_TRON_ADDRESS;

  let apiUrl = '', valid = false;

  try {
    if (chain === 'ETH') {
      apiUrl = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETH_API}`;
    } else if (chain === 'BNB') {
      apiUrl = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BSC_API}`;
    } else if (chain === 'TRON') {
      apiUrl = `https://api.trongrid.io/v1/transactions/${txHash}`;
    } else {
      return Response.json({ success: false, error: 'Unsupported chain' }, { status: 400 });
    }

    const fetchRes = await fetch(apiUrl);
    const data = await fetchRes.json();

    if (chain === 'TRON') {
      valid = data.data && data.data.length > 0 && data.data[0].contractRet === 'SUCCESS' &&
              data.data[0].raw_data.contract[0].parameter.value.to_address === TRON_WALLET;
    } else {
      valid = data.result && data.result.status === '1';
    }

    if (valid) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: 'Transaction not found or not valid' }, { status: 400 });
    }
  } catch (err) {
    console.error('Verify API error:', err);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

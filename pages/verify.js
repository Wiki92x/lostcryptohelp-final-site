import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { txHash, chain } = req.body;

  const ETH_API_KEY = process.env.ETHERSCAN_API_KEY;
  const BSC_API_KEY = process.env.BSCSCAN_API_KEY;
  const TRON_API_KEY = process.env.TRONSCAN_API_KEY;

  const ETH_ADDRESS = process.env.VERIFY_ETH_ADDRESS;
  const BNB_ADDRESS = process.env.VERIFY_BNB_ADDRESS;
  const TRON_ADDRESS = process.env.VERIFY_TRON_ADDRESS;

  try {
    let response, success = false;

    switch (chain) {
      case 'ETH':
        response = await axios.get(
          `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETH_API_KEY}`
        );
        success = response.data.status === '1' && response.data.result.status === '1';
        break;

      case 'BNB':
        response = await axios.get(
          `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BSC_API_KEY}`
        );
        success = response.data.status === '1' && response.data.result.status === '1';
        break;

      case 'TRON':
        response = await axios.get(
          `https://api.trongrid.io/v1/transactions/${txHash}?apikey=${TRON_API_KEY}`
        );
        const txData = response.data.data?.[0];
        success =
          txData?.ret?.[0]?.contractRet === 'SUCCESS' &&
          txData?.raw_data?.contract?.[0]?.parameter?.value?.to_address?.toLowerCase().includes(
            TRON_ADDRESS.toLowerCase()
          );
        break;

      default:
        return res.status(400).json({ success: false, error: 'Unsupported chain' });
    }

    if (success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: 'Transaction not valid or not confirmed' });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

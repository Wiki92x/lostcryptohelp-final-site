'use client';

import { useAccount } from 'wagmi';

const mockNFTs = [
  {
    name: 'Bored Ape Yacht Club #1234',
    image: 'https://ipfs.io/ipfs/Qm...example',
    flagged: true,
    reason: 'Reported as stolen on OpenSea',
  },
  {
    name: 'CryptoPunk #888',
    image: 'https://ipfs.io/ipfs/Qm...punk',
    flagged: false,
    reason: '',
  },
];

export default function NftCheckPage() {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-500 mb-6 text-center">NFT Scam & Stolen Checker</h1>
        <p className="text-gray-400 text-center mb-12">
          Check if your NFTs are safe or flagged as stolen across major platforms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNFTs.map((nft, idx) => (
            <div
              key={idx}
              className={`bg-gray-900 border ${
                nft.flagged ? 'border-red-600' : 'border-gray-700'
              } rounded-xl p-4 shadow-md`}
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-purple-400 mb-2">{nft.name}</h2>
              {nft.flagged ? (
                <p className="text-sm text-red-400">⚠️ {nft.reason}</p>
              ) : (
                <p className="text-sm text-green-400">No issues found</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          Wallet: {isConnected ? <span className="text-green-400">{address}</span> : 'Not Connected'}
        </div>
      </div>
    </div>
  );
}
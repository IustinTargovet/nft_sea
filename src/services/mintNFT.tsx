import * as React from 'react';
import { useWriteContract } from 'wagmi';
import { abi } from '../abi';

interface MintNFTProps {
  tokenId: number;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export function MintNFT({ tokenId, onSuccess, onError }: MintNFTProps) {
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function submit() {
    const addressEnv = process.env.NEXT_PUBLIC_NFT_ADDRESS || '';
    const address: `0x${string}` = addressEnv.startsWith('0x') ? addressEnv as `0x${string}` : '0x' as `0x${string}`;

    try {
      await writeContract({
        address,
        abi,
        functionName: 'mint',
        args: [tokenId],
      });
      console.log(`Transaction Hash: ${hash}`);
      onSuccess();
    } catch (error) {
      console.error('Minting error:', error);
      onError(error);
    }
  }

  return (
    <button
      onClick={submit}
      disabled={isPending}
      className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white"
    >
      {isPending ? 'Confirming...' : 'Mint'}
    </button>
  );
}

export default MintNFT;

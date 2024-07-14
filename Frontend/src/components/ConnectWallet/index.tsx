import { useState } from 'react';
import { WalletSDK } from '@roninnetwork/wallet-sdk';
import './styles.css';

interface ConnectRoninWalletButtonProps {
  onConnected: (address: string) => void;
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ConnectRoninWalletButton(props: ConnectRoninWalletButtonProps) {
  const [userAddress, setUserAddress] = useState<string | undefined>();
  const [copied, setCopied] = useState<boolean>(false);

  function checkRoninInstalled() {
    if ('ronin' in window) {
      return true
    } 

    window.open('https://wallet.roninchain.com', '_blank')
    return false
  }

  async function connectRoninWallet() {
    const sdk = new WalletSDK()
    await sdk.connectInjected()

    const isInstalled = checkRoninInstalled()
    if (isInstalled === false) {
      return;
    }

    const accounts = await sdk.requestAccounts()
    if (accounts) {
      const address = accounts[0];
      setUserAddress(address);
      props.onConnected(address);
      setCopied(false);
    }
  }

  function copyToClipboard() {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div className="connect-wallet-container">
      {copied && <span className="copied-notification">Copied!</span>}
      <button
        className="button-connect"
        onClick={userAddress ? copyToClipboard : connectRoninWallet}
      >
        {userAddress ? `${shortenAddress(userAddress)}` : 'Connect Wallet'}
      </button>
    </div>
  );
}


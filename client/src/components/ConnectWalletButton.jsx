import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export const ConnectWalletButton = () => {
  const address = useAddress();
  return (
    <div>
      <ConnectWallet />
    </div>
  );
};
import { Contract, ContractInterface, ethers } from "ethers";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useContractContext, {
  ContractContext,
} from "../../hooks/ContractContext";
import {
  CRYPTO_DEV_TOKEN_CONTRACT_ABI,
  CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS,
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
} from "../../constants";
import WalletConnectHandler from "./Wallet/WalletConnectHandler";
import Balances from "./Balance/Balances";
import Swap from "./Swap/Swap";
import Liquidity from "./Liquidity/Liquidity";
import Nav from "./Nav/Nav";

export default function DEX() {
  const {
    getProviderOrSigner,
    userAddress,
    walletConnected,
    connectWallet,
  }: ContractContext = useContractContext() as ContractContext;
  const [ethBalance, setEthBalance] = useState("0");
  const [cryptoDevsTokenBalance, setCryptoDevsTokenBalance] = useState("0");
  const [LPTokenBalance, setLPTokenBalance] = useState("0");
  const [isSwaping, setIsSwaping] = useState(false);
  const [isLiquidity, setIsLiquidity] = useState(false);

  const handleBalanceFetch = async () => {
    const cryptoDevsTokenBalance = await getTokenBalance(
      CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS,
      CRYPTO_DEV_TOKEN_CONTRACT_ABI,
      userAddress
    );
    setCryptoDevsTokenBalance(cryptoDevsTokenBalance);

    const LPTokensBalances = await getTokenBalance(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      userAddress
    );
    setLPTokenBalance(LPTokenBalance);

    const provider = await getProviderOrSigner();
    let ethBalance = await provider.getBalance(userAddress);
    ethBalance = ethers.utils.formatEther(ethBalance);
    setEthBalance(ethBalance);

    console.log({ cryptoDevsTokenBalance, LPTokensBalances, ethBalance });
  };

  const getTokenBalance = async (
    contractAddress: string,
    contractABI: ContractInterface,
    userAddress: string
  ): Promise<string> => {
    const provider = await getProviderOrSigner();
    const contract = new Contract(contractAddress, contractABI, provider);
    const tx = (await contract.balanceOf(userAddress)) as ethers.BigNumberish;
    return ethers.utils.formatEther(tx);
  };

  useEffect(() => {
    if (walletConnected) {
      handleBalanceFetch();
    }
  }, [walletConnected]);

  const renderComponents = () => {
    if (walletConnected) {
      return (
        <div className="flex flex-col min-w-full min-h-full">
          <Nav
            isLiquidity={isLiquidity}
            isSwaping={isSwaping}
            setIsSwaping={setIsSwaping}
            setIsLiquidity={setIsLiquidity}
          />
          <Balances
            ethBalance={ethBalance}
            cryptoDevsTokenBalance={cryptoDevsTokenBalance}
            LPTokenBalance={LPTokenBalance}
          />
          <div>
            {isSwaping && <Swap></Swap>}
            {isLiquidity && <Liquidity></Liquidity>}
          </div>
        </div>
      );
    }

    return <WalletConnectHandler connectWallet={connectWallet} />;
  };

  return <>{renderComponents()}</>;
}

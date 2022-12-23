import { Dispatch, SetStateAction } from "react";

export interface DexProps {
  connectWallet?: () => void;
  ethBalance?: string;
  cryptoDevsTokenBalance?: string;
  LPTokenBalance?: string;
  isLiquidity?: boolean;
  isSwaping?: boolean;
  setIsLiquidity?: Dispatch<SetStateAction<boolean>> | any;
  setIsSwaping?: Dispatch<SetStateAction<boolean>> | any;
}

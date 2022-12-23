import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { DexProps } from "../types/Contract";
import { useState } from "react";
import styles from "./styles/Balance.module.css";

export default function Balances({
  ethBalance,
  cryptoDevsTokenBalance,
  LPTokenBalance,
}: DexProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5 border-2 rounded-md p-5 m-5 bg-slate-100 dark:bg-slate-700 shadow-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">Balances</h1>{" "}
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? (
            <AiOutlineArrowUp></AiOutlineArrowUp>
          ) : (
            <AiOutlineArrowDown></AiOutlineArrowDown>
          )}
        </button>
      </div>
      {isOpen ? (
        <div>
          <div className={styles.balance}>
            <p>Ether:</p>
            <p>{ethBalance}</p>
          </div>
          <div className={styles.balance}>
            <p>Crypto Devs Token:</p>
            <p>{cryptoDevsTokenBalance}</p>
          </div>
          <div className={styles.balance}>
            <p>Liquidity Provider Token:</p>
            <p>{LPTokenBalance}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

import { DexProps } from "../types/Contract";

export default function Nav({
  isSwaping,
  isLiquidity,
  setIsSwaping,
  setIsLiquidity,
}: DexProps) {
  return (
    <div className="flex gap-5 mt-5 mx-5 justify-end">
      <button
        onClick={() => setIsSwaping(!isSwaping)}
        className={`${
          isSwaping
            ? "bg-red-300 border-2 border-red-500"
            : "bg-green-300 border-2 border-green-500"
        } text-black font-bold py-2 px-4 rounded-full`}
      >
        {isSwaping ? "Hide" : "Swap"}
      </button>
      <button
        onClick={() => setIsLiquidity(!isLiquidity)}
        className={`${
          isLiquidity
            ? "bg-red-300 border-2 border-red-500"
            : "bg-green-300 border-2 border-green-500"
        } text-black font-bold py-2 px-4 rounded-full`}
      >
        {isLiquidity ? "Hide" : "Liquidity"}
      </button>
    </div>
  );
}

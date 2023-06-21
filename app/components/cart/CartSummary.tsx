import StyledButton from "../styledButton/StyledButton";
import { Dispatch, SetStateAction } from "react";
import ItemsSummary from "./cartSummary/ItemsSummary";
import PriceSummary from "./cartSummary/PriceSummary";
import CupomField from "./cartSummary/CupomField";

export default function CartSummary({isDetails, setIsDetails}: {isDetails: boolean, setIsDetails: Dispatch<SetStateAction<boolean>>}){
  return <>
    <div className={`${isDetails && 'hidden'} h-full justify-between sm:divide-gray-300 sm:border-l-2 w-full sm:w-2/6 sm:flex sm:flex-col`}>
          <h2 className="block font-bold text-lg mb-2 ml-2 mt-3 text-gray-700">Resumo de compras</h2>
          <div className="h-[30%] overflow-auto mb-2">
             <ItemsSummary/>
          </div>
          <div className="flex w-full h-[15%] sm:h-[20%] items-center sm:border-y-2 py-1 sm:py-4">
             <CupomField/>
          </div>
          <div className="h-[40%] text-bold text-gray-800  flex flex-col justify-evenly text-sm md:text-lg">
             <PriceSummary isDetails={isDetails} setIsDetails={setIsDetails}/>
             <StyledButton text="Proximo" className={'sm:hidden w-2/3 py-4'} onClick={() => setIsDetails(true)}/>
          </div>
      </div>
  </>
}
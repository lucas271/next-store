import { Dispatch, SetStateAction } from "react";
import StyledButton from "../../styledButton/StyledButton";
import './style.css'

export default function PriceSummary({isDetails, setIsDetails}: {isDetails: boolean, setIsDetails: Dispatch<SetStateAction<boolean>>}){
  return <div className="price_summary px-2">
    <div>
      <span >Subtotal </span>
      <span>R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
    <div>
      <span>Frete </span>
      <span>R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
    <div>
      <span>Cupom </span>
      <span>R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
    <div>
      <span>Total</span>
      <span> R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
  </div>
}
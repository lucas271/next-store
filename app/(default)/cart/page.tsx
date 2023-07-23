"use client"
import CartSummary from "@/app/components/cart/CartSummary";
import PaymentDetails from "@/app/components/cart/PaymentDetails";
import { useState } from "react";
import { BsCart} from "react-icons/bs";

export default function Cart(){
  const [isDetails, setIsDetails] = useState<boolean>(false)

  return <>
  <div className="w-screen h-screen-minus-nav relative overflow-x-hidden">
    <div className="h-[7%] sm:h-[10%] flex items-center pl-2 gap-4 text-2xl border-b-2 font-bold p-1">
      <BsCart/> 
      <h1 className="text-lg sm:text-2xl mt-1">Meu Carrinho</h1>
    </div>
    <div className="h-[93%] sm:h-[90%] flex gap-2 sm:px-3 px-1 pb-2 justify-center items-center">
      <PaymentDetails isDetails={isDetails} setIsDetails={setIsDetails}/>
      <CartSummary isDetails={isDetails} setIsDetails={setIsDetails}/>
    </div>
  </div>
  </>
}
"use client"
import CartSummary from "@/app/components/cart/CartSummary";
import PaymentDetails from "@/app/components/cart/PaymentDetails";
import { useState } from "react";
import { BsCart} from "react-icons/bs";

export default function Cart(){
  const [isDetails, setIsDetails] = useState<boolean>(false)

  return <>
  <div className="w-screen h-screen-minus-nav relative overflow-x-hidden">
    <div className="h-[10%] flex items-center pl-2 gap-4 text-2xl border-b-2 font-bold">
      <BsCart/> 
      <h1 className="mt-2">Meu Carrinho</h1>
    </div>
    <div className="h-[90%] flex gap-2 p-3 sm:py-6 py-1 justify-center items-center">
      <PaymentDetails isDetails={isDetails} setIsDetails={setIsDetails}/>
      <CartSummary isDetails={isDetails} setIsDetails={setIsDetails}/>
    </div>
  </div>
  </>
}
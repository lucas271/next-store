"use client"

import { useState } from "react"
import CartSummary from "./CartSummary"
import PaymentDetails from "./PaymentDetails"
import { RiEmotionSadLine } from "react-icons/ri";
import { useAppSelector } from "@/lib/services/reduxStore/storeHooks";

const CartInfo = () => {
    const [isDetails, setIsDetails] = useState<boolean>(false)
    const cart = useAppSelector(state => state.cart)

    //might be fine to add a placeholder or ssr here for better loading UI
    return <div className="h-full w-5/6 sm:w-full flex">
        {
            cart.products.length > 0 || cart.loading ? <>
                <PaymentDetails isDetails={isDetails} setIsDetails={setIsDetails}/>
                <CartSummary isDetails={isDetails} setIsDetails={setIsDetails}/>
            </>:  <> 
                <div className="h-full w-3/4 m-auto flex justify-center items-center text-center">
                    <span className="font-bold text-2xl flex gap-4 justify-center items-center text-slate-700"><RiEmotionSadLine /> Seu carrinho está vazio</span>
                </div>
            </>
        }
    </div>
}

export default CartInfo
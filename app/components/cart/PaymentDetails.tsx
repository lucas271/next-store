import { Dispatch, SetStateAction } from "react";
import PaymentForm from "./paymentDetails/PaymentForm";
import { BsArrowLeft } from "react-icons/bs";

export default function PaymentDetails({isDetails, setIsDetails}: {isDetails: boolean, setIsDetails: Dispatch<SetStateAction<boolean>>}){
  return <>
  <div className={`${!isDetails && 'hidden'} w-full justify-evenly sm:w-4/6 h-full sm:pr-8 sm:flex sm:flex-col `}>
        <div className="flex items-center gap-3 text-gray-500 hover:text-gray-700 sm:text-gray-700 sm:cursor-auto transition duration-200 mb-4 mt-3 text-lg font-bold cursor-pointer" onClick={() => setIsDetails(false)}>
          <span className="inline-flex sm:hidden"><BsArrowLeft/></span>
          <h2> Detalhes De pagamento</h2>
        </div>
        <PaymentForm/>
  </div>
  </>
}
import { Dispatch, SetStateAction } from "react";
import PaymentForm from "../forms/PaymentForm";
import { BsArrowLeft } from "react-icons/bs";

export default function PaymentDetails({isDetails, setIsDetails}: {isDetails: boolean, setIsDetails: Dispatch<SetStateAction<boolean>>}){
  return <>
  <div className={`${!isDetails && 'hidden'} w-full justify-between sm:w-4/6 h-full px-1 sm:px-2 flex flex-col sm:flex sm:flex-col`}>
    <div className="mt-2 flex items-center gap-2 text-gray-500  hover:text-gray-700 sm:text-gray-700 sm:cursor-auto transition duration-200 text-xl font-bold cursor-pointer"  tabIndex={isDetails ? 0 : -1} onClick={() => setIsDetails(false)}>
      <span className="inline-flex sm:hidden"><BsArrowLeft/></span>
      <h2> Detalhes De pagamento</h2>
    </div>
    <PaymentForm isDetails={isDetails} setIsDetails={setIsDetails}/>
  </div>
  </>
}
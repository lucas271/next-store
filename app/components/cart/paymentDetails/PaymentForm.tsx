import StyledButton from "../../styledButton/StyledButton";
import StyledInput from "../../styledInput/StyledInput";

export default function PaymentForm(){
  return <>
    <form action="" className="flex flex-col gap-3 justify-between h-5/6 sm:text-md text-sm">
      <div className="flex justify-center items-center w-full gap-2 h-16 relative">
        <div className="w-1/2 relative bg-slate-300 border rounded-md flex items-center shadow-lg h-full max-h-full">
          <input type="checkbox" id="pix" className="absolute right-4 " />
          <label htmlFor="pix" className="block h-full w-full  p-4" >Pix</label> 
        </div>
        <div className="w-1/2 relative bg-slate-300 border rounded-md flex items-center shadow-lg h-full max-h-full">
          <input type="checkbox" id="credit" className="absolute right-4" />
          <label htmlFor="credit" className="block h-full w-full  p-4" >Cartão de credito</label> 
        </div>
      </div>
      <div className="w-full">
          <label htmlFor="holder_name">Nome do proprietário do cartão</label>
          <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]"/>
      </div>
      <div className="w-full">
          <label htmlFor="holder_name">Numero do cartão</label>
          <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]"/>
      </div>
      <div className="flex w-full gap-5">
        <div className="w-2/3 ">
          Data de vencimento
          <div className="flex gap-5">
            <div className="w-1/2">
              <StyledInput id="holder_name" className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]"/>
            </div>
            <div className="w-1/2">
              <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]"/>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <h2>CVV</h2>
          <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF] "/>
        </div>
      </div>
      <StyledButton className='sm:w-2/5 w-4/5 bg-gray-200 transition duration-200 focus:bg-[#FFFFFF] text-sm md:text-lg' text={"Pagar: " + "R$"+(27.64).toFixed(2).replace('.', ',')}/>
  </form>
</>
}
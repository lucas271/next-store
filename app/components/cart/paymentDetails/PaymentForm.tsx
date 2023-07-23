import { Dispatch, SetStateAction, useState } from "react";
import StyledButton from "../../utility/styledButton/StyledButton";
import StyledInput from "../../utility/styledInput/StyledInput";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { PaymentTypeInterface, PaymentValidationType, paymentValidation } from "./paymentValidation";
import ErrorMessage from "../../utility/errorMessage/ErrorMessage";

export default function PaymentForm({isDetails, setIsDetails}: {isDetails: boolean, setIsDetails: Dispatch<SetStateAction<boolean>>}){
  const [output, setOutput] = useState('')
  const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm<PaymentValidationType>({
    resolver: zodResolver(paymentValidation)
  })

  const validateCard = (data: any) => {
    setOutput(data)
  }

  const handleCheckboxChange = (type: PaymentTypeInterface) => {
    const paymentType = watch('paymentType')
    if(paymentType === type) return setValue('paymentType', '')
    setValue('paymentType', type);
  };

  console.log(errors, watch('paymentType'))

  return <>
    <form action="" 
      className="flex flex-col gap-3 justify-between h-full sm:text-md text-lg" 
      onSubmit={handleSubmit(validateCard)}
    >
      {errors.paymentType?.message && <ErrorMessage message={errors.paymentType.message}/>}
      <div className="flex justify-center items-center w-full gap-2 h-16 relative ">
        <div className="w-1/2 relative bg-slate-300 border rounded-md flex items-center shadow-lg">
          <input type="checkbox" id="pix" className="absolute right-4 " checked={watch('paymentType') === 'PIX'} onChange={() => handleCheckboxChange('PIX')}/>
          <label htmlFor="pix" className="block h-full w-full  p-4" >Pix</label> 
        </div>
        <div className="w-1/2 relative bg-slate-300 border rounded-md flex items-center shadow-lg">
          <input type="checkbox" id="credit" className="absolute right-4" checked={watch('paymentType') === 'CREDIT'} onChange={() => handleCheckboxChange('CREDIT')}/>
          <label htmlFor="credit" className="block h-full w-full  p-4 sm:text-md">Credito</label> 
        </div>
      </div>
      <div className="w-full">
          {errors.cardHolder?.message && <ErrorMessage message={errors.cardHolder.message}/>}
          <label htmlFor="holder_name">Nome do proprietário do cartão</label>
          <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]" register={register} name="cardHolder"/>
      </div>
      <div className="w-full">
          {errors.cardNumber?.message && <ErrorMessage message={errors.cardNumber.message}/>}
          <label htmlFor="card_number">Numero do cartão</label>
          <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]" register={register} name="cardNumber"/>
      </div>
      <div className="flex w-full gap-5 h-fill items-end">
        <div className="w-1/2 ">
          Validade
          <div className="flex gap-2 items-center">
            <div className="w-1/2">
              <StyledInput id="holder_name" className="text-center bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]" register={register} name="2131"/>
            </div>
            /
            <div className="w-1/2">
              <StyledInput className=" text-center bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]" register={register} name="odksao"/>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          {errors.CVV?.message && <ErrorMessage message={errors.CVV.message}/>}
          <h2>CVV</h2>
          <StyledInput className="bg-gray-200 transition duration-200 focus:bg-[#FFFFFF] w-full" register={register} name="CVV"/>
        </div>
      </div>
      <StyledButton className='sm:w-2/5 w-4/5 py-3 bg-gray-200 transition duration-200 focus:bg-[#FFFFFF]' text={"Pagar: " + "R$"+(27.64).toFixed(2).replace('.', ',')} />
  </form>
</>
}
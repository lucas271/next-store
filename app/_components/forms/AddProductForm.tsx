"use client"

import { Dispatch, SetStateAction, useState } from "react"
import StyledButton from "../shared/styledButton/StyledButton"
import StyledInput from "../shared/styledInput/StyledInput";
import { addProductValidation, addProductValidationType } from "@/util/productValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../shared/errorMessage/ErrorMessage";
import { useAppDispatch } from "@/lib/services/reduxStore/storeHooks";
import { addProduct } from "@/lib/services/slices/productSlice";

const AddProductForm = ({setIsOpen}: {setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
  const dispatch = useAppDispatch()

  const {register, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<addProductValidationType>({
    resolver: zodResolver(addProductValidation),
  })

  function validate(data: addProductValidationType){
    dispatch(addProduct({...data, price: Number(data.price), quantity: Number(data.quantity)}))
    setIsOpen(false)
    reset()
    clearErrors()
  }

  return <>
        <form onSubmit={handleSubmit(validate)} className="flex flex-col justify-center  gap-5 h-full">
          {errors.name?.message && <ErrorMessage message={errors.name.message}/>}
          <StyledInput placeholder="nome do produto" name="name" id="name" register={register}/>
          {errors.description?.message && <ErrorMessage message={errors.description.message}/>}
          <StyledInput placeholder="descrição do produto" name="description" id="description" register={register}/>
          {errors.price?.message && <ErrorMessage message={errors.price.message}/>}
          <StyledInput placeholder="preço do produto" type="number" name="price" id="price" register={register}/>
          {errors.title?.message && <ErrorMessage message={errors.title.message}/>}
          <StyledInput placeholder="titulo do produto" name="title" id="title" register={register}/>
          {errors.quantity?.message && <ErrorMessage message={errors.quantity.message}/>}
          <StyledInput placeholder="quantidade no estoque" type="number" name="quantity" id="quantity" register={register}/>

          <StyledButton text="Enviar" className={'w-full py-2.5'}/>
        </form>
  </>
}

export default AddProductForm
"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import StyledButton from "../shared/styledButton/StyledButton"
import StyledInput from "../shared/styledInput/StyledInput";
import { addProductValidation, addProductValidationType, editProductValidation, editProductValidationType } from "@/util/productValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../shared/errorMessage/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { addProduct, updateProduct } from "@/lib/services/slices/productSlice";

const AddProductForm = ({setIsOpen, isUpdate=false, productId, placeholderName, placeholderDescription, placeholderTitle, placeholderPrice, placeholderQuantity}: {setIsOpen: Dispatch<SetStateAction<boolean>>, isUpdate?: boolean, productId?: string, placeholderName?: string, placeholderDescription?: string, placeholderTitle?: string, placeholderPrice?: string, placeholderQuantity?: string}) => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.product)

  type productFormType = typeof isUpdate extends true ? editProductValidationType : addProductValidationType
  const {register, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<productFormType>({
  	resolver: zodResolver(isUpdate ? editProductValidation : addProductValidation),
  })
 

  async function validate(data: productFormType){
	const base64File = await new Promise((resolve, reject) => {
		if(!data.img) return
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result);
		};

		reader.onerror = error => {
			reject(error);
		};

		reader.readAsDataURL(data.img);
	});
  	if(!Number(data.price) || !Number(data.quantity)) return
  	if(isUpdate && !productId) return 
  	if(isUpdate) dispatch(updateProduct({productId: productId || '', updateInfo: {...data, img: String(base64File),  price: Number(data.price), quantity: Number(data.quantity)}}))
  	else {dispatch(addProduct({...data, img: String(base64File), price: Number(data.price), quantity: Number(data.quantity)}))}
  	setIsOpen(false)
  	reset()
  	clearErrors()
  }


  

  return <>
  	<form onSubmit={handleSubmit(validate)} className="flex flex-col justify-center  gap-5 h-full overflow-auto">
  		{[...products.errors].map((errMessage, index) => {
  			return <div key={index}>
  				<ErrorMessage message={errMessage}/>
  			</div>
  		})}

		{errors.img?.message && <ErrorMessage message={errors.img.message} />}
		<input type='file' {...register('img')} name="img"/>
  		{errors.name?.message && <ErrorMessage message={errors.name.message} />}
  		<StyledInput placeholder={placeholderName ? "nome: " +placeholderName : "nome do produto"} name="name" id="name" register={register}/>
  		{errors.description?.message && <ErrorMessage message={errors.description.message}/>}
  		<StyledInput placeholder={placeholderDescription ? "descrição: " +placeholderDescription : "descrição do produto"} name="description" id="description" register={register}/>
  		{errors.price?.message && <ErrorMessage message={errors.price.message}/>}
  		<StyledInput placeholder={placeholderPrice ? "preço: " +placeholderPrice : "preço do produto"} type="number" name="price" id="price" register={register}/>
  		{errors.title?.message && <ErrorMessage message={errors.title.message}/>}
  		<StyledInput placeholder={placeholderTitle ? "titulo: " + placeholderTitle : "titulo do produto"} name="title" id="title" register={register}/>
  		{errors.quantity?.message && <ErrorMessage message={errors.quantity.message}/>}
  		<StyledInput placeholder={placeholderQuantity ? "quantidade: " +placeholderQuantity : "quantidade no estoque"} type="number" name="quantity"  id="quantity" register={register}/>

  		<StyledButton text="Enviar" className={'w-full py-2.5'}/>
  	</form>
  </>
}

export default AddProductForm
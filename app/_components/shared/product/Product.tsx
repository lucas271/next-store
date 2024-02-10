"use client"
import { useRouter } from "next/navigation"
import StyledButton from "../styledButton/StyledButton"
import Image from 'next/image'
import { BsArrowRight, BsFillCreditCardFill, BsPenFill, BsTrashFill } from "react-icons/bs"
import { MdPix } from "react-icons/md"
import { useAppDispatch } from "@/lib/services/reduxStore/storeHooks"
import { useState } from "react"
import { removeProduct } from "@/lib/services/slices/productSlice"
import ProductForm from "../../forms/ProductForm"
import HeartIcon from "../heartIcon/HeartIcon"

const Product = ({price, title, name, description, quantity,  id, customButtomDispatchAction, customButtonText = '+ carrinho', isAdmin = false}: {isAdmin?: boolean, price?: string, id: string, name?: string, description?: string, quantity?: number, title?: string, customButtomDispatchAction?: () => void, iconAction?: () => void, customButtonText?: string}) => {
	const router = useRouter()
	const dispatch = useAppDispatch()



	const [isUpdate, setIsUpdate] = useState<boolean>(false)

	const deleteProduct = () => {
		const userResponse = confirm('Isso irá excluir esse item. Tem Certeza?')
		userResponse && dispatch(removeProduct(id))  
	}

	return <>
		<section className={"w-full h-full  flex-shrink-0 animate hover:white hover:border-2 transition-all group relative cursor-pointer " + (isUpdate && 'p-2 border-2')}>
			{!isAdmin ? 
				<HeartIcon id={id}/>: 
				<span className="absolute top-3 right-4  z-40 cursor-pointer  flex gap-2">
					{!isUpdate ? <>
						<BsPenFill className="text-slate-600 hover:text-slate-800  transition-all" onClick={() => setIsUpdate(true)}/>
						<BsTrashFill className="text-slate-600 hover:text-slate-800  transition-all" onClick={deleteProduct}/>
					</>: 
						<BsArrowRight className="text-slate-600 hover:text-slate-800  transition-all" onClick={() => setIsUpdate(false)}/>}
				</span>}
			{ !isUpdate ? <>
				<div className="w-full h-full relative bg-opacity-30 bg-transparent transition-all group-hover:inline-block z-20  group-hover:bg-slate-800 group-hover:bg-opacity-30 ">
					<div className={"h-3/6  relative   cursor-pointer -z-10 "}>
						<Image src='/bottle.png' alt="bottle" fill sizes="100%" className="-z-10"/>
					</div>
					<div  className="h-3/6 flex flex-col justify-evenly w-3/4 m-auto text-center">
						<div className="text-gray-700 uppercase overflow-clip pt-1 flex flex-col justify-between w-full text-sm sm:text-lg">
							<div className="text-gray-900 w-full whitespace-no-wrap">{title}</div>
						</div>
						<div className="text-center flex flex-col gap-2 font-bold">
							<div className="w-full text-slate-700 text-lg flex justify-center items-center gap-1"> <BsFillCreditCardFill/> 3x  de {price && price.includes('R$') ? ( Number(price.replace(/[^.,\d]/g, "").replace(',', '.')) / 3).toFixed(2).replace('.',',') : 'R$' + (Number(price) / 3).toFixed(2).replace('.', ',')}</div>
							<div className="w-full text-slate-900 text-sm">{price && price.includes('R$') ? price.replace('.', ',') : 'R$' + Number(price).toFixed(2).replace('.', ',')}</div>
							<div className="w-full text-slate-500 text-sm flex justify-center items-center gap-1"><MdPix/> No pix: {price && price.includes('R$') ? ( Number(price.replace(/[^.,\d]/g, "").replace(',', '.')) * 0.96).toFixed(2).replace('.',',') : 'R$' + (Number(price) * 0.96).toFixed(2).replace('.', ',')} </div>
						</div>
					</div>
				</div>

				<div className="hidden group-hover:absolute w-full h-full top-0  z-30 group-hover:flex justify-end items-center flex-col uppercase p-4 ">
					<div className=" flex flex-col items-center gap-1 shadow-xl  shaddow-xl">
						<StyledButton text={customButtonText} onClick={() => customButtomDispatchAction && customButtomDispatchAction()} className={'w-full bg-white border-none p-3 px-6 z-50 animate-slide-in-from-top'}/>
						<StyledButton text="ver mais" className={'w-full bg-white border-none p-3 px-8 animate-slide-in-from-top'} onClick={() => router.push('/item/'+id)}/>
					</div>
				</div> 
			</>: <>
				<ProductForm productId={id} isUpdate={true} setIsOpen={setIsUpdate} placeholderPrice={price} placeholderName={name} placeholderDescription={description} placeholderQuantity={String(quantity)} placeholderTitle={title}/>
			</>
			}
		</section>
	</>
}

export default Product
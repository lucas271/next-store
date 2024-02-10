"use client"

import { addProduct } from "@/lib/services/slices/cartSlicer";
import Product from "../../shared/product/Product";
import StoreBenefits from "../../shared/storeBenefits/StoreBenefits";
import StyledButton from "../../shared/styledButton/StyledButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProducts } from "@/lib/services/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { CircularProgress } from "@mui/material";

export default function Recommendation(){
	const router = useRouter()
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.product)

	useEffect(() => {
		dispatch(getProducts({limit: 3, sortBy: {mostFavourites: true}}))
	}, [dispatch])

	return <>
		<div className='h-screen-minus-nav flex flex-col'>
			<StoreBenefits/>
			<div className='grow shrink w-full flex flex-col justify-evenly items-center relative'>
				<h2 className='text-xl font-bold'>Recomendações</h2>
				<div className=' w-full cu md:w-4/6 flex sm:gap-6 gap-2 justify-center h-3/4 sm:h-2/3'>
					{
						!products.loading ? products.products.slice(0, 3).map((product, index) => {
							return <div className={'sm:w-1/3 w-2/3 h-full ' + (index >= 1 && 'hidden sm:block')} key={product.id}>
								<Product customButtomDispatchAction={() => dispatch(addProduct({productId: product.id || String(index)}))} id={product.id || String(index)} price={String(product.price)} title={product.title}/>
							</div>

						}) : <div className="w-full h-full flex justify-center items-center">
							<CircularProgress property="" size={'5vh'}/>
						</div>
					}
				</div>
				<StyledButton text='Outros produtos' className={' p-6'} onClick={() => router.push('/item')}/>
			</div>
		</div>

	</>
}
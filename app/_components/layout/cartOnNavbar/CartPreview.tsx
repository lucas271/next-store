/* eslint-disable react-hooks/exhaustive-deps */
"use client"
/* eslint-disable react/display-name */

import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { addProduct, removeSingleProduct } from "@/lib/services/slices/cartSlicer"
import { forwardRef, useEffect } from "react"
import StyledButton from "../../shared/styledButton/StyledButton"
import { BsFillCreditCardFill } from "react-icons/bs"
import { MdPix } from "react-icons/md"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { BiSad } from "react-icons/bi"
import formatPrice from "@/util/formatPrice"
import { CircularProgress } from "@mui/material"

export default forwardRef<HTMLDivElement | null, {}>((_props, ref) => {
	const cart = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()
	const route = useRouter()


	return <>
    
		<div ref={ref} className=" animate-slide-in-from-top   rounded-md shadow-md  fixed flex justify-between flex-col bg-slate-50 lg:w-[50vw] md:w-[65vw] sm:w-[75vw] sm:h-[50vh] md:h-[45vh] lg:h-[42.5vh]  md:p-5 sm:p-2 right-4 top-20 z-50">
			<header className="p-3">
				<h3 className="text-2xl font-bold">Carrinho</h3>
			</header>

			{!(cart.products.length > 0) ? <>
				<span className="flex flex-col justify-center h-full items-center text-center text-slate-600 gap-6">
					<div className="flex gap-2 items-center">
						<BiSad/> Carrinho vazio
					</div>
					<StyledButton text="Ver Produtos" className={'p-3'} onClick={() => route.push('/item')}/>
				</span>
			</>  : <>
				<ul className="flex-grow flex-shrink w-full flex flex-col gap-8 list-none overflow-auto">
            
					{cart.products.map(({product, quantity}) => {
						return <li className="flex h-4/6 justify-center items-center w-full gap-3" key={product.id}>
							<div className=" w-[20%] relative h-full">
								<Image src={'/'+ product.img} alt="bottle" fill sizes="100%"/>
							</div>
							<article className="w-[25%] sm:w-[23%] h-full relative flex flex-col gap-2 justify-center ">
								<h3 className="flex text-center truncate text-xl font-bold">{product.name}</h3>
								<p className="flex-shrink flex text-sm overflow-hidden text-center">{product.title}</p>
							</article>
							<div className="flex flex-grow justify-center items-center flex-shrink relative text-xl">
								<button disabled={product.loading} className=" p-1 hover:text-slate-900 transition-all" onClick={() => dispatch(removeSingleProduct(product.id))}>
                                        -
								</button>
								<div className="w-2/4 text-center break-words">{product?.loading ? <CircularProgress size={'12px'} className="text-slate-600"/> : quantity}</div>
								<button className="p-1 hover:text-slate-900 transition-all" disabled={product.loading} onClick={() => dispatch(addProduct({productId: product.id}))}>+</button>
							</div>
							<div className="text-center flex flex-col sm:gap-0.5  font-bold text-sm w-[33%] md:w-[30%]">
								<div className="w-full text-slate-700 text-sm flex justify-center items-center gap-1"> <BsFillCreditCardFill/> 3x  de {formatPrice((Number(product.price ) * Number(quantity)) / 3)}</div>
								<div className="w-full text-slate-900 text-sm">ou</div>
								<div className="w-full text-slate-500 text-sm flex justify-center items-center gap-1"><MdPix/> No pix: {formatPrice((Number(product.price ) * Number(quantity)) * 0.96)} </div>
								<div>
									<StyledButton text='Ir para item' onClick={() =>route.push(`/item/${product.id}`)} className={'md:py-1 sm:py-0.5 sm:px-2 md:px-4 text-sm bg-slate-800 text-slate-50'}/>
								</div>
							</div>
						</li>
					})}
				</ul>

				<footer className="mt-5 flex gap-y-2 gap-x-4 items-center h-1/5 w-full text-slate-600 font-semibold   md:justify-start md:flex-row sm:flex-col md:items-center sm:justify-center sm:items-start relative">
					<div className="flex gap-2 sm:h-1/2 md:h-full justify-center items-center md:text-lg">
                            Ir para <StyledButton text='carrinho' onClick={() =>route.push('/cart')} className={'py-2 sm:px-6 sm:text-sm md:text-lg md:px-8 bg-slate-800 text-slate-50'}/>

					</div>
					<div className="flex items-center sm:h-1/2 md:h-full justify-center md:text-lg">
                            Total: R${ (cart.products.reduce((pv, cv) => pv + (Number(cv.product.price)) * Number(cv.quantity), 0)).toFixed(2).replace('.',',') }

					</div>
				</footer>
			</>
			}


		</div>
	</>
})
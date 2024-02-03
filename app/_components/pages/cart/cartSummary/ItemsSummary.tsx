import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsTrash } from "react-icons/bs";
import Image from 'next/image'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { addProduct, getCart, removeProduct, removeSingleProduct } from "@/lib/services/slices/cartSlicer";
import { CircularProgress } from "@mui/material";

export default function ItemsSummary(){

	const cart = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()


	return <>
		<ul className="space-y-2 flex flex-col h-full">
			{
				cart.loading && cart.products.length < 1 ? <>
					<div className="w-full h-full relative flex items-center justify-center"><CircularProgress size={"7rem"}/></div>
				</> : <>
					<li>
						{
							cart.products.map(item => {
								return <div className="flex gap-2 justify-between items-center py-3 px-1 relative text-lg" key={item.product?.id}>

									<Image src={'/'+item.product?.img || '/bottle.png'} alt={item.product?.name || 'imagem do item'} className='text-[0px]' width={30} height={30}/>
									<div className="utils flex gap-3">
										<button  disabled={item.product.loading} className="text-gray-800 hover:text-gray-950 transition duration-200" onClick={() => dispatch(removeSingleProduct(item.product?.id))}><BsFillArrowLeftCircleFill/></button>
										<span>{item.product?.loading ? <CircularProgress size={'12px'} className="text-slate-600"/> : item.quantity}</span>
										<button  disabled={item.product.loading} className="text-gray-800 hover:text-gray-950 transition duration-200" onClick={() => dispatch(addProduct({productId: item.product?.id}))}><BsFillArrowRightCircleFill/></button>
									</div>
									<span>R${(Number(item.product?.price) * Number(item.quantity)).toFixed(2).replace('.',',') || '???'}</span>
									<BsTrash className="absolute top-0 right-1 transition duration-200 cursor-pointer bg-yellow text-red-600 hover:text-red-800" tabIndex={0} onClick={() => dispatch(removeProduct(item.product.id))}/>
								</div>
							})
						}
					</li>
				</>
			}

		</ul>
	</>
}
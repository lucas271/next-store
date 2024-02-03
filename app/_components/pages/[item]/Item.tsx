import StyledButton from "@/app/_components/shared/styledButton/StyledButton";
import formatPrice from "@/util/formatPrice";
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { addProduct } from "@/lib/services/slices/cartSlicer";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useState } from "react";
import HeartIcon from "../../shared/heartIcon/HeartIcon";
import SingleStarRating from "../../shared/singleStarRating/SingleStarRating";


export default function Item(){
	const item = useAppSelector(state => state.product)
	const dispatch = useAppDispatch()
	const id = useParams()


	const [addToCartQuantity, setAddToCartQuantity] = useState<number>(1)




	function handleQuantityToAdd(type: 'increase' | 'decrease' | 'input' = 'increase', inputTarget?: string){
		if(type === 'decrease' && addToCartQuantity <= 1) return console.log('b')
		else{
			if(type === 'increase') setAddToCartQuantity(pv => pv + 1)
			else if (type === 'decrease') setAddToCartQuantity(pv => pv - 1)
			else if (type === 'input') {
				if(!Number(inputTarget)) return
				if(Number(inputTarget) <= 0) return
				setAddToCartQuantity(Number(inputTarget))
			}
		}
	}

    
	return <>
		{item.product && <>
			<SingleStarRating id={String(id?.item) || ''} isGettingRating={true}/>

			<HeartIcon id={String(id?.item) || ''} isGetWishListItems={true}/>
         
			<div className="block sm:hidden w-full relative mt-4 sm:mt-0">
				<article className="">
					<h2 className=" font-bold text-2xl uppercase">{item.product.name}</h2>
					<p className="text-sm">{item.product.title}</p>
				</article>
			</div>
 
			<div className="h-2/5 sm:h-2/6 md:h-2/5 lg:h-4/6 w-5/6 sm:w-2/5 relative">
				<Image src={'/bottle.png'} fill alt="bottle" priority sizes="100%"/>
			</div>
			<div className="h-1/2 flex-shrink-1 w-full sm:w-2/5 flex justify-around flex-col md:gap-4 gap-3  md:px-4 sm:px-2 sm:h-5/6 relative">
				<div className="text-lg flex flex-col gap-2 flex-grow flex-shrink overflow-auto">
					<article className="hidden sm:block">
						<h2 className=" font-bold sm:text-2xl  md:text-3xl uppercase">{item.product.name}</h2>
						<p className=" break-words sm:text-md md:text-lg capitalize">{item.product.title}</p>
					</article>
					<span className=" text-slate-600 sm:text-sm md:text-lg">{formatPrice(Number(item.product.price))}</span>
					<div className="mt-4 overflow-auto flex-shrink flex-grow" >
						<p className=" break-words text-sm md:text-lg pr-2">
							{item.product.description}

						</p>
					</div>
				</div>
				<div>
					<div className="pb-6 flex justify-between items-center relative md:h-3/5 sm:2/5 gap-2">
						<div className="flex items-center md:px-3 border-2 border-slate-600 h-full px-2">
							<span className="font-bold capitalize text-slate-800 ">quantity</span>
						</div>
						<div className="flex gap-1 justify-end">
							<StyledButton text="-" className={'px-2'} onClick={() => handleQuantityToAdd("decrease")}></StyledButton>
							<input type="number" className="border-2 border-slate-600 text-center w-2/5  p-1 sm:w-2/5 rounded-md appearance-none" onChange={(e) => handleQuantityToAdd('input', e.target.value)} value={addToCartQuantity}/>
							<StyledButton text="+" className={'px-2 py-0'}  onClick={() => handleQuantityToAdd("increase")}></StyledButton>
						</div>
					</div>
					<div className="flex gap-1 sm:gap-2 h-2/5 font-bold justify-center items-center ">
						<StyledButton text="comprar" className='text-sm w-2/4 sm:w-2/5 p-1 sm:px-1 md:px-2'/>
						<StyledButton text="+ carrinho" className='text-sm w-2/4 sm:w-3/5 sm:px-1 md:px-2 p-1' onClick={() => dispatch(addProduct({productId:item.product?.id || '', increment:addToCartQuantity}))}/>
					</div>
 
				</div>
			</div>
		</> 
		}
    
	</>
}
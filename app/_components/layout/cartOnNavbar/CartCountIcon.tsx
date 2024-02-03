"use client"

import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { getCart } from "@/lib/services/slices/cartSlicer"
import { CircularProgress } from "@mui/material"
import { useEffect } from "react"

export default function CartCountIcon({className}: {className: string}){
	const cart = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()

	useEffect(() => {
		cart.products.length === 0 && dispatch(getCart())
	}, [])

	return <>
		<span className={" bg-slate-100 text-slate-800 flex items-center justify-center   rounded-full absolute " +className}>
			{cart.loading ? <div className="w-100 flex align-middle justify-center"><CircularProgress size={'12px'} className="text-slate-600"/></div>  : <>
				{cart.products.reduce((pv, cv) => { return {quantity: pv.quantity + cv.quantity}}, {quantity: 0}).quantity}
			</>}
		</span>
	</>
}
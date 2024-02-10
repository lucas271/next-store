"use client"

import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { getProducts } from "@/lib/services/slices/productSlice"
import React, { ReactElement, useEffect,  } from "react"
import Product from "@/app/_components/shared/product/Product";
import { addProduct } from "@/lib/services/slices/cartSlicer";
import { CircularProgress } from "@mui/material";
import ErrorMessage from "../../shared/errorMessage/ErrorMessage";
import StyledButton from "../../shared/styledButton/StyledButton";
import { getWishListItems } from "@/lib/services/slices/wishListSlicer";

export default function ProductsContainer({children, isAdmin = false}: {children?: ReactElement, isAdmin?: boolean}){
	
	const products = useAppSelector(state => state.product)
	const dispatch = useAppDispatch()
	const wishList = useAppSelector(state => state.wishList)

	useEffect(() => {
		dispatch(getProducts({}))
		!isAdmin && dispatch(getWishListItems())
	}, [dispatch, isAdmin])


	if(products.loading){
		return <div className=" col-span-4 h-[45vh] flex justify-center items-center mt-12 min-h-screen-minus-nav"><CircularProgress size={'20vh'}/></div> 
	}

	return <section className="lg:w-[75%] md:w-[80%] w-[85%] mt-12 grid lg:grid-cols-4  gap-y-12 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 m-auto my-2 relative flex-wrap min-h-screen-minus-nav">
        
		{products.errors.length > 0 && <div className="w-full col-span-full rounded-lg p-4">
			{products.errors.map((errMsg, index) => <span key={index} >
				<ErrorMessage message={errMsg}/>
			</span>
			)}
			<StyledButton text="Atualizar" onClick={() => dispatch(getProducts({}))} className={'p-3'}/>
		</div>}
		{children}
        
		{products.products.map(product => { 
			return <div className="sm:h-[48vh] h-[65vh] relative" key={product.id}>
				<Product isAdmin={isAdmin} title={product.name} description={isAdmin ? product.description : undefined} quantity={isAdmin ? product.quantity : undefined} name={isAdmin ? product.name : undefined} price={String(product.price)} customButtomDispatchAction={ () => dispatch(addProduct({productId:product.id || ''}))} id={product.id || ''} />
			</div>
		})}
	</section>
}
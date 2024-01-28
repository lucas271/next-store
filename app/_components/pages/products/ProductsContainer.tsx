/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { getProducts } from "@/lib/services/slices/productSlice"
import React, { ReactElement, useEffect,  } from "react"
import Product from "@/app/_components/shared/product/Product";
import { addProduct } from "@/lib/services/slices/cartSlicer";
import { CircularProgress } from "@mui/material";

export default function ProductsContainer({children, isAdmin = false}: {children?: ReactElement, isAdmin?: boolean}){
    const products = useAppSelector(state => state.product)
    const dispatch = useAppDispatch()
    const wishList = useAppSelector(state => state.wishList)

    useEffect(() => {
        dispatch(getProducts({}))
      }, [dispatch])


    if(products.loading){
        return <div className=" col-span-4 h-[45vh] flex justify-center items-center mt-12 min-h-screen-minus-nav"><CircularProgress size={'20vh'}/></div> 
    }

    return <section className="lg:w-[75%] md:w-[80%] w-[85%] grid lg:grid-cols-4  gap-y-12 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 m-auto my-2 relative flex-wrap min-h-screen-minus-nav">
        {children}

        {products.products.map(product => { 
            return <div className="sm:h-[48vh] h-[40vh]" key={product.id}>
                <div>{JSON.stringify(wishList.products.find((product) => product.product.id === product.id))}</div>
                <Product isAdmin={isAdmin} title={product.name} price={String(product.price)} customButtomDispatchAction={ () => dispatch(addProduct({productId:product.id || ''}))} id={product.id || ''} />
            </div>
        })}
    </section>
}
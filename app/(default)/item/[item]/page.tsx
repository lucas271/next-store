"use client"

import Item from "@/app/_components/pages/[item]/Item"
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { getProduct } from "@/lib/services/slices/productSlice";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const CommentsContainerComponent = dynamic(() => import("@/app/_components/shared/commentsContainer/CommentsContainer"), {ssr: false})

export default function ItemContainer(){
	const id = useParams()
	const item = useAppSelector(state => state.product)
	const dispatch = useAppDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(getProduct(String(id?.item) || ''))
	}, [dispatch, id?.item])

	useEffect(() => {
		if(item.product === undefined){
			router.push('/notfound')
		}
	}, [router, item.product])
	return<>
		{item.loading ? <>
			<div className="h-screen-minus-nav w-full flex justify-center items-center">
				<CircularProgress className="mx-auto my-auto" size={'10vh'}/>
			</div>
		</>: <> 
			<main className="w-[90%] md:w-[80%] sm:w-[85%] h-screen-minus-nav m-auto relative py-5 ">
				<div className="md:px-8 sm:px-4 px-6 py-4 overflow-hidden relative h-full gap-5 w-full border-slate-200 border-4 rounded-lg flex flex-col sm:flex-row justify-evenly items-center">
					<Item/>
				</div>
			</main>
			<footer>
				<CommentsContainerComponent productId={String(id?.item)}/>
			</footer>
    
		</>
		}

	</>
}
"use client"

import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import Comment from "../comment/Comment"
import { getReviews } from "@/lib/services/slices/reviewSlicer"
import { useEffect, useState } from "react"
import StyledButton from "../styledButton/StyledButton"
import { BiSad, BiUpsideDown } from "react-icons/bi"
import { useSession } from "next-auth/react"
import { CircularProgress } from "@mui/material"
import CommentForm from "../../forms/CommentForm"

export default function CommentsContainer({productId} : {productId?: string}){
	const dispatch = useAppDispatch()
	const review = useAppSelector(state => state.review)
	const session =  useSession()

	useEffect(() => {
		productId && dispatch(getReviews(productId))
	}, [dispatch, productId]) 

	return <>
		<section className="w-[90%] sm:w-[80%] md:w-[70%] text-slate-800 m-auto">
			{review.loading ? <> 
				<div className="h-[30vh] w-full gap-6 flex justify-center flex-col items-center">
					<span className="uppercase text-xl font-bold">Carregando comentários</span>
					<CircularProgress size={'10vh'} className="text-slate-800" />
				</div>

            
			</> : <>
				{!session.data?.user ? 
				<div className="mb-6 rounded-lg bg-slate-200 text-slate-500 p-3 sm:w-fit break-words">
                        Voce precisa estar logado para comentar: <StyledButton text='entre' className={'sm:ml-6 p-2 px-8 text-slate-700 bg-slate-200'}/> 
				</div> 
				: 
				!review.reviews.find(review => review.userId === session.data?.user?.id) ? <CommentForm productId={productId || ''} />
				: 
				<div className="flex flex-col gap-3">
					{review.reviews.filter(comment => comment.userId === session.data?.user?.id).map(comment => {
						if (comment.userId !== session.data.user.id) return <> </>
						return <div className="bg-slate-800 p-3 rounded-xl mb-12" key={comment.id + '1'}>
							<div className="w-5/6 mx-auto">
								<h4 className="text-slate-50 text-xl">Sua avaliação:</h4>
								<Comment productId={productId} rate={comment.Rating?.rate} name={String(session.data.user.name)} userId={comment.userId} title={comment.title} id={comment.id ||' '} text={comment.message} />
							</div>
						</div>
					})}
				</div>
				}

                
				<h3 className="text-xl uppercase text-slate-700 mb-3">Comentarios <span className="text-slate-400">&#40;{review.reviews.filter(comment => comment.userId !== session.data?.user?.id).length}&#x29;</span>: </h3>
				<div className="flex flex-col gap-4 items-center">
					{
						review.reviews.filter(comment => comment.userId !== session.data?.user?.id).length > 0 
							? 
							review.reviews.filter(comment => comment.userId !== session.data?.user?.id).map((comment) => {
								if(!comment.id) return <p>a</p>
								if(!comment.userId) return <p>a</p>
								return <div key={comment.id} className="w-full relative mb-6">
									<Comment rate={comment.Rating?.rate} name={comment.userName || 'anonymous user'} userId={comment.userId} title={comment.title} id={comment.id ||' '} text={comment.message} />
								</div>
							}) 
							: 
							<div className="w-full flex items-center justify-center  mb-4">
								<div className="w-full h-[30vh] p-8 bg-slate-50 rounded-lg flex justify-center items-center text-sm gap-3 sm:text-xl">
									{review.reviews.length > 0 ? <BiUpsideDown /> : <BiSad className="text-2xl"/> }
									{review.reviews.length > 0 ? "Apenas você comentou nesse produto" : "Nenhum Comentário nesse produto ainda" }
                                    
								</div>
							</div>
					}
				</div>
            
			</>}
		</section>
	</>
}


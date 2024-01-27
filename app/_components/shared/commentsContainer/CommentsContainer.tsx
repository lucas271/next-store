"use client"

import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import Comment from "../comment/Comment"
import { addReview, getReviews } from "@/lib/services/slices/reviewSlicer"
import { useEffect, useState } from "react"
import StyledButton from "../styledButton/StyledButton"
import { BiSad } from "react-icons/bi"
import { MdStar, MdStarOutline } from "react-icons/md"
import AddCommentForm from "../../forms/AddCommentForm"
import { useSession } from "next-auth/react"

export default function CommentsContainer({productId} : {productId?: string}){
    const dispatch = useAppDispatch()
    const review = useAppSelector(state => state.review)
    const session =  useSession()

    useEffect(() => {
        productId && dispatch(getReviews(productId))
    }, [dispatch, productId]) 

    return <>

        <section className="w-[90%] sm:w-[80%] md:w-[70%] text-slate-800 m-auto">
            {!session.data?.user ? <div className="mb-6 rounded-lg bg-slate-200 text-slate-500 p-3 sm:w-fit break-words">
                    Voce precisa estar logado para comentar: <StyledButton text='entre' className={'sm:ml-6 p-2 px-8 text-slate-700 bg-slate-200'}/> 
                </div> : <AddCommentForm productId={productId || ''}/>
            }

            
            <h3 className="text-xl uppercase text-slate-700 mb-3">Comentarios <span className="text-slate-400">&#40;{review.reviews.length}&#x29;</span>: </h3>
            <div className="flex flex-col gap-4 items-center">
                {review.loading ? <>
                    loading reviews...
                </> : <>
                    {
                        review.reviews.length > 0 
                        ? 
                        review.reviews.map((comment) => {
                            if(!comment.id) return
                            if(!comment.userId) return
                            return <div key={comment.id} className="w-full relative mb-6">
                                <Comment userId={comment.userId} title={comment.title} id={comment.id ||' '} text={comment.message} />
                            </div>
                        }) 
                        : 
                        <div className="w-full flex items-center justify-center  mb-4">
                            <div className="w-full h-[30vh] p-8 bg-slate-50 rounded-lg flex justify-center items-center text-sm gap-3 sm:text-xl">
                                <BiSad className="text-2xl"/> Nenhum Comentário nesse produto ainda 
                                
                            </div>
                        </div>
                    }
                </>
                }
            </div>


        </section>
    
    </>
}


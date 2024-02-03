"use client"

import { useEffect, useState } from "react";
import { BsPenFill, BsStarFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useSession } from "next-auth/react";
import { IoMdTrash } from "react-icons/io";
import { getReviews, removeReview } from "@/lib/services/slices/reviewSlicer";
import { useAppDispatch } from "@/lib/services/reduxStore/storeHooks";
import ReduxProvider from "@/app/_providers/ReduxProvider";
import CommentForm from "../../forms/CommentForm";
import { getProductRatings, removeRating } from "@/lib/services/slices/ratingSlicer";
import { useParams } from "next/navigation";

export default  function Comment({title, text, userId, name, rate, id, productId}: {productId?: string, rate?: number, name: string, title: string, text: string, userId: string, id: string}){
	//would be fine to add createdAt to comment, but WILL need further changes in API, and that is not the priority now.


	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const itemId = useParams()


	//need to update models so it allow for stars  and name to be gotten

	const deleteComment = async () => {
		const userResponse = confirm('Tem certeza que quer deletar a avaliação?')
		userResponse && await dispatch(removeReview(id)) && dispatch(getProductRatings(id))
	}

	useEffect(() => {
		if(isUpdate) {
			setIsEdit(!isEdit)
			productId && dispatch(getReviews(productId))
			productId && dispatch(getProductRatings(productId))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUpdate])

	const {data: session} = useSession()

	return <>
		<div className="w-full  p-8 relative m-auto bg-slate-100 rounded-lg overflow-auto whitespace-break-spaces">
			<div className={"absolute flex items-center left-0  top-0 p-2 w-full text-slate-500 " + (rate ? 'justify-between' : 'justify-end')}>
				{rate && <div className="text-yellow-400 flex gap-2 items-center justify-center">
					<BsStarFill className="mb-0.5"/>  {rate ? <span>{rate}</span>: ''}
				</div>}
				{session?.user.id === userId  && <div className="flex gap-4 items-center ">
					{isEdit ? <MdClose className="hover:text-slate-800 transition cursor-pointer" onClick={() => setIsEdit(false)}/> : <BsPenFill className="hover:text-slate-800 transition cursor-pointer" onClick={() => setIsEdit(true)}/>}
					<IoMdTrash className="hover:text-slate-800 transition cursor-pointer" onClick={deleteComment}/>
				</div>}
			</div>
			<div className="flex flex-col gap-3">
				<span className="text-sm text-slate-500 mt-2 capitalize">{name || 'anonymousUser'}</span>
				{
					session?.user.id === userId && isEdit ? <>
						<ReduxProvider>
							{<CommentForm ratePlaceholder={rate} textPlaceholder={text}  isUpdate={true}  reviewId={id} setIsUpdate={setIsUpdate}/>}
						</ReduxProvider>

					</> : <>
						<article className="">
							<div className="flex justify-between items-center">                            
								<h3 className="text-xl text-slate-600 ">{title}</h3>
								<span>{}</span>
							</div>
							<p>{text}</p>
						</article>
					</>
				}

			</div>
		</div>
    
	</>
}
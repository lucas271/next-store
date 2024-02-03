"use client"

import { MdStar, MdStarOutline } from "react-icons/md"
import StyledButton from "../shared/styledButton/StyledButton"
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { addReview, updateReview } from "@/lib/services/slices/reviewSlicer"
import { reviewValidation, reviewValidationType } from "@/util/reviewValidation"
import { useForm } from "react-hook-form"
import ErrorMessage from "../shared/errorMessage/ErrorMessage"
import { CircularProgress } from "@mui/material"
import { zodResolver } from "@hookform/resolvers/zod"
import { getProductRatings } from "@/lib/services/slices/ratingSlicer"

const CommentForm = ({productId, isUpdate = false, reviewId, setIsUpdate, textPlaceholder, ratePlaceholder}: {textPlaceholder?: string, ratePlaceholder?:number, productId?: string, setIsUpdate?: Dispatch<SetStateAction<boolean>> ,isUpdate?: boolean, reviewId?: string, }) => {
	const dispatch = useAppDispatch()
	const review = useAppSelector(state => state.review)
	const [starHoverPosition, setStarHoverPosition] = useState<number>(ratePlaceholder ? ratePlaceholder : 0)
	const [starSelectedPosition, setStarSelectedPosition] = useState<number>(ratePlaceholder ? ratePlaceholder : 0)
	const [title, setTitle] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const reviews = useAppSelector(state => state.review)
	const rating = useAppSelector(state => state.rating)

	useEffect(() => {
		if(review.reviews.length > 0) return setIsUpdate && setIsUpdate(true) 
	}, [review.reviews, setIsUpdate])

	const {register, handleSubmit, formState: {errors}, reset, clearErrors, setError} = useForm<reviewValidationType>({
		resolver: zodResolver(reviewValidation)
	})
    
	async function validate(){
		if(starSelectedPosition < 0.5) return setError('rating', {message: 'Rating deve ter no minimo uma estrela.'})
		if(isUpdate)	dispatch(updateReview({title, message, rating: starSelectedPosition !== ratePlaceholder ? starSelectedPosition : undefined, commentId: reviewId || ''}))
		if(!isUpdate) productId && await dispatch(addReview({title, message, productId: productId , rating: starSelectedPosition})) && dispatch(getProductRatings(productId))
		reset()
		clearErrors()
	}
	return <>
		<form action="" className="text-slate-800 mb-6 flex flex-col gap-4 lg:w-[55%] md:w-[70%] w-full " onSubmit={handleSubmit(validate)}>
			{
				review.loading ? <>
					<div className="w-full flex justify-center items-center mx-auto relative">
						<CircularProgress className="mx-auto" size={'8vh'}/>
					</div>
				</> : <> 
					<header>
						{[...rating.errors, ...reviews.errors].map((errMessage, index) => {
							return <div key={index}>
								<ErrorMessage message={errMessage}/>
							</div>
						})}
						<h3 className="text-2xl uppercase">faça sua avaliação:</h3>
					</header>
					{errors.rating?.message && <ErrorMessage message={errors.rating.message}/>}
					<div className="flex w-fit p-1" onMouseLeave={() => setStarHoverPosition(starSelectedPosition)} >
						{
							[...Array(5)].map((_value, index) => {
								const starIndex = index 
								//there are a lot of easier ways to do this, but not with react icons aparently. 
								//the way they handle their icons make it impossible to transition from outline to fill without multiple components and to customize 
								//svg style 
								//other svg libraries are not like that, so my mistake here indeed. Just choose another library next time XD
								return <div className="flex relative w-[1.75rem] h-[2rem]" key={index}>
									<div className="absolute left-0 w-1/2 group">
										<input
											type="radio"
											name="star"
											id={`star-${starIndex + 0.5}`}
											className="hidden"
											onClick={() => setStarSelectedPosition(pv => pv === starIndex + 0.5 ? 0 : starIndex + 0.5)}
											value={0.5 + starIndex}
										/>
										<label
											htmlFor={`star-${starIndex + 0.5}`}
											className={`block cursor-pointer text-3xl overflow-hidden left-0 text-yellow-500`}
										>
											<MdStarOutline
												className={`py-[0.25rem] ${(starHoverPosition >= starIndex + 0.5 || starSelectedPosition >= starIndex + 0.5) && 'hidden '}`}
												onMouseEnter={() => setStarHoverPosition(starIndex + 0.5)}
											/>
											<MdStar
												className={`py-[0.25rem] ${(starHoverPosition < starIndex + 0.5 && starSelectedPosition < starIndex + 0.5) && 'hidden '} ${starIndex + 0.5 > starHoverPosition &&  starHoverPosition < starSelectedPosition && ' opacity-50'} text-transparent  transition-all duration-500 text-yellow-500`}
												onMouseEnter={() => setStarHoverPosition(starIndex + 0.5)}
												onMouseLeave={() => setStarHoverPosition(starHoverPosition - 0.5)}
											/>
										</label>
									</div>
									<div className="absolute right-0 w-1/2 group peer-grup">
										<input
											type="radio"
											name="star"
											id={`star-${starIndex + 1}`}
											className="hidden"
											onClick={() => setStarSelectedPosition(pv => pv === starIndex + 1 ? 0 : starIndex + 1)}
										/>
                                
										<label
											htmlFor={`star-${starIndex + 1}`}
											className="block cursor-pointer text-3xl overflow-hidden text-yellow-500"
										>
											<MdStarOutline
												className={`py-[0.25rem] ${(starHoverPosition >= starIndex + 1 || starSelectedPosition >= starIndex + 1) && 'hidden'} transform -translate-x-1/2 `}
												onMouseEnter={() => setStarHoverPosition(starIndex + 1)}
											/>
											<MdStar
												className={`py-[0.25rem] ${(starHoverPosition < starIndex + 1 && starSelectedPosition < starIndex + 1) && 'hidden' } ${starIndex + 1 > starHoverPosition &&  starHoverPosition < starSelectedPosition && ' opacity-50'} transform -translate-x-1/2 text-yellow-500`}
												onMouseEnter={() => setStarHoverPosition(starIndex + 1)}
												onMouseLeave={() => setStarHoverPosition(starHoverPosition - 0.5)}
											/>
										</label>
									</div>
								</div>
							})
						}
					</div>
					<div className=" flex flex-col gap-2">
						{errors.text?.message && <ErrorMessage message={errors.text.message}/>}
						<label htmlFor="text">Texto da avaliação</label>
						<textarea placeholder={textPlaceholder} {...register("text")} name="text" className='h-[30vh] rounded-xl border-2 p-3 border-slate-400 w-full' id="text" onChange={e => setMessage(e.target.value)} value={message}/>
					</div>
            
					<StyledButton text="Enviar mensagem" className={'px-6 py-4'}/>
				</>
			}
		</form>


	</>
}

export default CommentForm
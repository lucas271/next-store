import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { getProductRatings } from "@/lib/services/slices/ratingSlicer"
import { useEffect } from "react"
import { BsStarFill } from "react-icons/bs"


//allow custom className while defining default className.
//If className is defined as a prop in the parent component, all it's default styles are not included.
const SingleStarRating = ({id, className="absolute top-0.5 sm:top-4 left-2 sm:left-4", isGettingRating=false}: {id: string, className?: string, isGettingRating?: boolean}) => {
	//isGettingRating has the porpuse of trying to avoid duplication of dispatches (mainly getProductRatings duplication).

	const rating = useAppSelector(state => state.rating)
	const dispatch = useAppDispatch()
	useEffect(() => {
		isGettingRating && dispatch(getProductRatings(id))
	}, [id, dispatch, isGettingRating])
	return <>
		<span className={`${className} z-40 transition-all cursor-pointer group/singleStarRating`}>
			<div className="flex items-center justify-center gap-2 ">
				<BsStarFill className="text-yellow-500 text-xl transition group-hover/singleStarRating:text-yellow-600"/>
				<div className="text-sm flex justify-center items-center gap-1 mt-0.5"> 
					<span className="text-slate-600">
						{/* By businness logic, it's impossible that a user gives a 0 star rating, and I dont want 0 to appear if no rating was given to the product*/}
						{rating.UserGivenRatings.length > 0 && (rating.UserGivenRatings.reduce((pv, cv) => {
							return pv + cv.rate
						}, 0) / rating.UserGivenRatings.length).toFixed(2)} 
					</span> 
					<span className="text-slate-400 ">
                &#40;{rating.UserGivenRatings.length} {rating.UserGivenRatings.length === 1 ? "avaliação": "avaliações"}&#x29;
					</span>
				</div>
			</div>
		</span>
	</>

}

export default SingleStarRating
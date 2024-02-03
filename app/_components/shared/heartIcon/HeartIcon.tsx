import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { addToWishList, getWishListItems, removeFromWishList } from "@/lib/services/slices/wishListSlicer"
import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { BsHeart, BsHeartFill, BsHeartbreakFill } from "react-icons/bs"

//allow custom className while defining default className.
//If className is defined as a prop in the parent component, all it's default styles are not included.
const HeartIcon = ({id, className="absolute top-1 sm:top-4 right-2 sm:right-4", isGetWishListItems=false}:{id: string, className?: string, isGetWishListItems?: boolean}) => {
	//isGetWishListItems has the porpuse of trying to avoid duplication of dispatches (mainly getWishListItems duplication).

	const dispatch = useAppDispatch()

	const wishList = useAppSelector(state => state.wishList)
	const [isHeartFill, setIsHeartFill] = useState<boolean>()
	const {data: session} = useSession()

	useEffect(() => {
		isGetWishListItems && dispatch(getWishListItems())
	}, [isGetWishListItems, dispatch])

	useEffect(() => {      
		if(isHeartFill === undefined && wishList.products.length > 0) {
			setIsHeartFill(wishList.products.find(product => product.product.id === id) ? true : false)
		}
		if(wishList.errors.length > 0) setIsHeartFill(wishList.products.find(product => product.product.id === id) ? true : false)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, wishList.errors, wishList.products])

	const handleIconHeartClick = (): void => {
		const wishListItemId = wishList.products.find(product => product.product.id === id)?.id || ''

		if(isHeartFill) {
			setIsHeartFill(!isHeartFill)
			dispatch(removeFromWishList(wishListItemId))
			return
		}
		setIsHeartFill(!isHeartFill)
		dispatch(addToWishList(id))
	}
	
	if(!session?.user.id) return <></>
	return <>
		<span className={`${className} z-40 transition-all group/heart cursor-pointer ${!isHeartFill ? wishList.loading ? 'text-red-300' : 'text-red-400' : wishList.loading ? 'text-red-700' : 'text-red-800' }`} onClick={!wishList.loading ? handleIconHeartClick : () => void 0}> 
			<BsHeart className={ `transition-all  ${!isHeartFill ? 'inline-block group-hover/heart:hidden': 'hidden'}`}/>
			<BsHeartFill className={`transition-all  ${!isHeartFill ? 'group-hover/heart:inline-block hidden' : 'inline-block group-hover/heart:hidden'} `}/>
			<BsHeartbreakFill className={`transition-all ${!isHeartFill ? 'hidden': 'group-hover/heart:inline-block hidden '}`}/>
		</span>
	</>
}

export default HeartIcon
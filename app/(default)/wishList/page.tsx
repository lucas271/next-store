import WishListCleanALL from "@/app/_components/pages/wishlist/WishListCleanAll"
import WishListItems from "@/app/_components/pages/wishlist/WishListItems"
import { BsHeart } from "react-icons/bs"

const WishList =() => {
	return <>
		<div className="min-h-screen-minus-nav relative flex flex-col">
			<header className="w-full h-[8vh] border-b-2 px-4 flex items-center justify-between text-gray-700">
				<h2 className="flex items-center gap-2 text-xl"><BsHeart color="red"/> Favoritos </h2>
				<WishListCleanALL/>
			</header>
			<WishListItems/>
		</div>
	</>
}

export default WishList
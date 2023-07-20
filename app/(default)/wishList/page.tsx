import ProductRecommendation from "@/app/components/ProductRecommendation/ProductRecommendation"
import WishListHeader from "@/app/components/wishlist/WishListHeader"
import WishListItems from "@/app/components/wishlist/WishListItems"

const wishList = () => {
  return <>
    <div className="min-h-screen-minus-nav relative flex flex-col">
      <WishListHeader className="h-[8vh]"/>
      <WishListItems className="grid flex-grow"/>
    </div>
  </>
}

export default wishList
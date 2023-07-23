import ProductRecommendation from "@/app/components/shared/productRecommendation/ProductRecommendation"
import WishListHeader from "@/app/components/views/wishlist/WishListHeader"
import WishListItems from "@/app/components/views/wishlist/WishListItems"

const wishList = () => {
  return <>
    <div className="min-h-screen-minus-nav relative flex flex-col">
      <WishListHeader className="h-[8vh]"/>
      <WishListItems className="grid flex-grow"/>
    </div>
  </>
}

export default wishList
import StyledButton from "@/app/_components/shared/styledButton/StyledButton";
import formatPrice from "@/util/formatPrice";
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { addProduct } from "@/lib/services/slices/cartSlicer";
import { getProduct } from "@/lib/services/slices/productSlice";
import { getProductRatings } from "@/lib/services/slices/ratingSlicer";
import { addToWishList, getWishListItems, removeFromWishList } from "@/lib/services/slices/wishListSlicer";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsHeart, BsHeartFill, BsHeartbreakFill, BsStarFill } from "react-icons/bs";

interface UrlParams{
  id: string,
  price: string,
  title: string,
  name: string,
  description: string
}

export default function Item(){
    const item = useAppSelector(state => state.product)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const id = useParams()
    const params = useSearchParams()

    console.log(params.get('id'))

    const [addToCartQuantity, setAddToCartQuantity] = useState<number>(1)
    const wishList = useAppSelector(state => state.wishList)
    const [isHeartFill, setIsHeartFill] = useState<boolean>()
    const rating = useAppSelector(state => state.rating)
    console.log(id)
    useEffect(() => {
      if(!id?.item) router.push('/') 
      dispatch(getProduct(String(id?.item) || ''))
      dispatch(getWishListItems())
      dispatch(getProductRatings(String(id?.item) || ''))

    }, [dispatch, id?.item, router])


    useEffect(() => {      
      if(isHeartFill === undefined && wishList.products.length > 0) {
        setIsHeartFill(wishList.products.find(product => product.product.id === String(id?.item)) ? true : false)
      }
      if(wishList.errors.length > 0) setIsHeartFill(wishList.products.find(product => product.product.id === String(id?.item)) ? true : false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id?.item, wishList.errors, wishList.products])
  
    //need to implment searchParams for better routes blablalba

    const handleIconHeartClick = (): void => {
      const wishListItemId = wishList.products.find(product => product.product.id === id?.item)?.id || ''
      const productId = String(id?.item) || ''
      //obviously this is a database structuring mistake solve this later on.

      if(isHeartFill) {
          setIsHeartFill(!isHeartFill)
          dispatch(removeFromWishList(wishListItemId))
          return void 0
      }
      setIsHeartFill(!isHeartFill)
      dispatch(addToWishList(productId))
    }

    function handleQuantityToAdd(type: 'increase' | 'decrease' | 'input' = 'increase', inputTarget?: string){
      if(type === 'decrease' && addToCartQuantity <= 1) return console.log('b')
      else{
        if(type === 'increase') setAddToCartQuantity(pv => pv + 1)
        else if (type === 'decrease') setAddToCartQuantity(pv => pv - 1)
        else if (type === 'input') {
          if(!Number(inputTarget)) return
          if(Number(inputTarget) <= 0) return
          setAddToCartQuantity(Number(inputTarget))
        }
      }
    }

    
    return <>
    {item.loading ? <>
          <AiOutlineLoading/>
        </> : item.product && <>
        <span className="absolute top-0.5 sm:top-4 left-2 sm:left-4 z-40 transition-all cursor-pointer group">
          <div className="flex items-center justify-center gap-2 ">
            <BsStarFill className="text-yellow-500 text-xl transition group-hover:text-yellow-600"/>
            <div className="text-sm flex justify-center items-center gap-1 mt-0.5"> 
              <span className="text-slate-600">
                {rating.UserGivenRatings.reduce((pv, cv) => {
                  return pv + Number(cv.rate)
                }, 0) || ''} {/* By businness logic, it's impossible that a user gives a 0 star rating, and I dont want 0 to appear if no rating was given to the product*/}
              </span> 
              <span className="text-slate-400 ">
                &#40;{rating.UserGivenRatings.length} {rating.UserGivenRatings.length === 1 ? "avaliação": "avaliações"}&#x29;
              </span>
            </div>
          </div>
        </span>
        <span className={`transition-all absolute top-1 sm:top-4 right-2 sm:right-4 group cursor-pointer ${!isHeartFill ? wishList.loading ? 'text-red-300' : 'text-red-400' : wishList.loading ? 'text-red-700' : 'text-red-800' }`} onClick={!wishList.loading ? handleIconHeartClick : () => void 0}> 
          <BsHeart className={ `transition-all  ${!isHeartFill ? 'inline-block group-hover:hidden': 'hidden'}`}/>
          <BsHeartFill className={`transition-all  ${!isHeartFill ? 'group-hover:inline-block hidden' : 'inline-block group-hover:hidden'} `}/>
          <BsHeartbreakFill className={`transition-all ${!isHeartFill ? 'hidden': 'group-hover:inline-block hidden '}`}/>
        </span>
         
         <div className="block sm:hidden w-full relative mt-4 sm:mt-0">
           <article className="">
                 <h2 className=" font-bold text-2xl uppercase">{item.product.name}</h2>
                 <p className="text-sm">{item.product.title}</p>
           </article>
         </div>
 
         <div className="h-2/5 sm:h-2/6 md:h-2/5 lg:h-4/6 w-5/6 sm:w-2/5 relative">
           <Image src={'/bottle.png'} fill alt="bottle" priority sizes="100%"/>
         </div>
         <div className="h-1/2 flex-shrink-1 w-full sm:w-2/5 flex justify-around flex-col md:gap-4 gap-3  md:px-4 sm:px-2 sm:h-5/6 relative">
           <div className="text-lg flex flex-col gap-2 flex-grow flex-shrink overflow-auto">
             <article className="hidden sm:block">
               <h2 className=" font-bold sm:text-2xl  md:text-3xl uppercase">{item.product.name}</h2>
               <p className=" break-words sm:text-md md:text-lg capitalize">{item.product.title}</p>
             </article>
             <span className=" text-slate-600 sm:text-sm md:text-lg">{formatPrice(Number(item.product.price))}</span>
             <div className="mt-4 overflow-auto flex-shrink flex-grow" >
                 <p className=" break-words text-sm md:text-lg pr-2">
                   {item.product.description}

                 </p>
             </div>
           </div>
           <div>
             <div className="pb-6 flex justify-between items-center relative md:h-3/5 sm:2/5 gap-2">
               <div className="flex items-center md:px-3 border-2 border-slate-600 h-full px-2">
                 <span className="font-bold capitalize text-slate-800 ">quantity</span>
               </div>
               <div className="flex gap-1 justify-end">
                 <StyledButton text="-" className={'px-2'} onClick={() => handleQuantityToAdd("decrease")}></StyledButton>
                 <input type="number" className="border-2 border-slate-600 text-center w-2/5  p-1 sm:w-2/5 rounded-md appearance-none" onChange={(e) => handleQuantityToAdd('input', e.target.value)} value={addToCartQuantity}/>
                 <StyledButton text="+" className={'px-2 py-0'}  onClick={() => handleQuantityToAdd("increase")}></StyledButton>
               </div>
             </div>
             <div className="flex gap-1 sm:gap-2 h-2/5 font-bold justify-center items-center ">
               <StyledButton text="comprar" className='text-sm w-2/4 sm:w-2/5 p-1 sm:px-1 md:px-2'/>
               <StyledButton text="+ carrinho" className='text-sm w-2/4 sm:w-3/5 sm:px-1 md:px-2 p-1' onClick={() => addProduct(item.product?.id || '')}/>
             </div>
 
           </div>
         </div>
        </> 
 }
    
    </>
}
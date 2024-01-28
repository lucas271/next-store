"use client"

import { BsStar, BsStarFill, BsTrash } from "react-icons/bs"
import StyledButton from "../../shared/styledButton/StyledButton"
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { getWishListItems, removeFromWishList } from "@/lib/services/slices/wishListSlicer"
import { useEffect } from "react"
import { CircularProgress } from "@mui/material"
import { MdHeartBroken } from "react-icons/md"
import { useRouter } from "next/navigation"
import formatPrice from "@/util/formatPrice"
import { addProduct } from "@/lib/services/slices/cartSlicer"

const WishListItems = () => {
  const dispatch = useAppDispatch()
  const wishList = useAppSelector(state => state.wishList)
  const router = useRouter()
  useEffect(() => {
    dispatch(getWishListItems())
  }, [dispatch])
 

  return <>
    <section className={`m-auto px-3 w-full my-3 grid grid-cols-1 flex-grow sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 `}>
      
      {wishList.loading ? <div className="w-100 flex items-center justify-center col-span-full">
        <CircularProgress size={'20vh'}/>
      </div>
      : !wishList.loading && wishList.products.length <= 0 ? 
      <span className="w-full flex items-center justify-center col-span-full gap-3 flex-col text-2xl text-slate-800">
        <div className="flex items-center justify-center text-2xl gap-3 text-center sm:flex-row flex-col">
          <MdHeartBroken className="text-red-600"/>Nenhum item no seu favoritos
        </div>
        <StyledButton onClick={() => router.push('/item')} text="Procurar itens" className={'p-4 block'}/>
      </span> : 
      <>
        {
          wishList.products.length > 0 && wishList.products.map((product) => {

            return <div key={product.id} className="lg:h-[70vh] md:h-[55vh] sm:h-[45vh] h-[70vh] relative flex flex-col sm:gap-1 gap-4 p-1">
              <div className="absolute right-3 top-1 z-40 flex-shrink">
                <button className="p-2 border-yellow rounded-full border-2 transition duration-200 text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white ">
                  <BsTrash onClick={() => dispatch(removeFromWishList(product.id || ''))}/>
                </button>
              </div>
              <div className="h-3/6  relative mt-4">
                <Image src={'/bottle.png'} alt="bottle" fill sizes="h-full" priority/>
              </div>
              <div  className="h-3/6 flex flex-col w-3/4 m-auto gap-3 justify-evenly relative">
                <article className="text-gray-700 uppercase overflow-auto h-2/6">
                  <h3 className="text-gray-900">{product.product.name}</h3>
                  <p className="font-italic">{product.product.title}</p>
                </article>
                <div className="h-2/6 font-bold flex justify-center flex-col items-start  shrink">
                  <span className="block font-bold text-slate-800 text-sm sm:text-xl">{formatPrice(product.product.price)}</span>
                  <span className="block text-slate-500  text-[0.7rem] sm:text-lg">ou 3x de {formatPrice(product.product.price / 3)} no cartão</span>
                </div>

                <div className="w-full h-2/6 flex flex-col gap-2 shrink"> 
                  <StyledButton text="+ Carrinho" className={'w-full sm:p-2 p-0.5'} onClick={() => dispatch(addProduct({productId: product.id}))}/>
                  <StyledButton text="Ver mais" className={'w-full sm:p-2 p-0.5'} onClick={() => router.push('/item/'+product.id)}/>
                </div>
              </div>
            </div>
          })
        }
       
      </>}
    </section>
  </>
}

export default WishListItems
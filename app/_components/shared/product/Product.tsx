"use client"
import { useRouter } from "next/navigation"
import StyledButton from "../styledButton/StyledButton"
import Image from 'next/image'
import { BsFillCreditCardFill, BsHeart, BsHeartFill, BsHeartbreakFill, BsPenFill, BsStarFill, BsTrashFill } from "react-icons/bs"
import { MdPix } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks"
import { useEffect, useState } from "react"
import { addToWishList, getWishListItems, removeFromWishList } from "@/lib/services/slices/wishListSlicer"
import { removeProduct } from "@/lib/services/slices/productSlice"

const Product = ({price, title, id, customButtomDispatchAction, customButtonText = '+ carrinho', isAdmin = false}: {isAdmin?: boolean, price?: string, id: string, title?: string, customButtomDispatchAction?: () => void, iconAction?: () => void, customButtonText?: string}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const wishList = useAppSelector(state => state.wishList)
  const [isHeartFill, setIsHeartFill] = useState<boolean>()

  useEffect(() => {
    dispatch(getWishListItems())
  }, [dispatch])

  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  useEffect(() => {      
    if(isHeartFill === undefined && wishList.products.length > 0) {
      setIsHeartFill(wishList.products.find(product => product.product.id === id) ? true : false)
    }
    if(wishList.errors.length > 0) setIsHeartFill(wishList.products.find(product => product.product.id === id) ? true : false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, wishList.errors, wishList.products])


  const handleIconHeartClick = (): void => {
    const wishListItemId = wishList.products.find(product => product.product.id === id)?.id || ''
    //obviously this is a database structuring mistake solve this later on.

    if(isHeartFill) {
        setIsHeartFill(!isHeartFill)
        dispatch(removeFromWishList(wishListItemId))
        return void 0
    }
    setIsHeartFill(!isHeartFill)
    dispatch(addToWishList(id))
  }
  const deleteProduct = () => {
    const userResponse = confirm('Isso irá excluir esse item. Tem Certeza?')
    userResponse && dispatch(removeProduct(id))  }
  return <>
      <section className={"w-full sm:h-[48vh] h-[40vh]  flex-shrink-0 animate hover:white hover:border-2 transition-all group relative cursor-pointer"}>
        {!isAdmin ? <span className={`absolute top-3 right-4  z-40 transition-all cursor-pointer group/heart ${!isHeartFill ? wishList.loading ? 'text-red-300' : 'text-red-400' : wishList.loading ? 'text-red-700' : 'text-red-800' }`} onClick={!wishList.loading ? handleIconHeartClick : () => void 0}>
          <BsHeart className={ `transition-all ${!isHeartFill ? 'inline-block group-hover/heart:hidden': 'hidden'}`}/>
          <BsHeartFill className={`transition-all ${!isHeartFill ? 'group-hover/heart:inline-block hidden' : 'inline-block group-hover/heart:hidden'} `}/>
          <BsHeartbreakFill className={`transition-all ${!isHeartFill ? 'hidden': 'group-hover/heart:inline-block hidden '}`}/>
        </span> : <span className="absolute top-3 right-4  z-40 cursor-pointer  flex gap-2">
          <BsPenFill className="text-slate-600 hover:text-slate-800  transition-all" onClick={() => setIsUpdate(!isUpdate)}/>
          <BsTrashFill className="text-slate-600 hover:text-slate-800  transition-all" onClick={deleteProduct}/>
        </span>}
        { !isUpdate ? <>
          <div className="w-full h-full relative bg-opacity-30 bg-transparent transition-all group-hover:inline-block z-20  group-hover:bg-slate-800 group-hover:bg-opacity-30 ">
            <div className={"h-3/6  relative   cursor-pointer -z-10 "}>
              <Image src='/bottle.png' alt="bottle" fill sizes="100%" className="-z-10"/>
            </div>
            <div  className="h-3/6 flex flex-col justify-evenly w-3/4 m-auto text-center">
              <div className="text-gray-700 uppercase overflow-clip pt-1 flex flex-col justify-between w-full text-sm sm:text-lg">
                <div className="text-gray-900 w-full whitespace-no-wrap">{title}</div>
              </div>
              <div className="text-center flex flex-col gap-2 font-bold">
                <div className="w-full text-slate-700 text-lg flex justify-center items-center gap-1"> <BsFillCreditCardFill/> 3x  de {price && price.includes('R$') ? ( Number(price.replace(/[^.,\d]/g, "").replace(',', '.')) / 3).toFixed(2).replace('.',',') : 'R$' + (Number(price) / 3).toFixed(2).replace('.', ',')}</div>
                <div className="w-full text-slate-900 text-sm">{price && price.includes('R$') ? price.replace('.', ',') : 'R$' + Number(price).toFixed(2).replace('.', ',')}</div>
                <div className="w-full text-slate-500 text-sm flex justify-center items-center gap-1"><MdPix/> No pix: {price && price.includes('R$') ? ( Number(price.replace(/[^.,\d]/g, "").replace(',', '.')) * 0.96).toFixed(2).replace('.',',') : 'R$' + (Number(price) * 0.96).toFixed(2).replace('.', ',')} </div>
              </div>
            </div>
          </div>

          <div className="hidden group-hover:absolute w-full h-full top-0  z-30 group-hover:flex justify-end items-center flex-col uppercase p-4 ">
            <div className=" flex flex-col items-center gap-1 shadow-xl  shaddow-xl">
              <StyledButton text={customButtonText} onClick={() => customButtomDispatchAction && customButtomDispatchAction()} className={'w-full bg-white border-none p-3 px-6 z-50 animate-slide-in-from-top'}/>
              <StyledButton text="ver mais" className={'w-full bg-white border-none p-3 px-8 animate-slide-in-from-top'} onClick={() => router.push('/item/'+id)}/>
            </div>
          </div> 
        </>: <>

        </>
        }
      </section>
  </>
}

export default Product
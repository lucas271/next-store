"use client"

import { useAppDispatch } from "@/lib/services/reduxStore/storeHooks"
import { removeAllFromWishList } from "@/lib/services/slices/wishListSlicer"

const WishListCleanALL = () => {
  const dispatch = useAppDispatch()

  function handleClearAll(): void{
    const userResponse = confirm('Isso irá excluir todos os items do seus favoritos, tem CERTEZA?')
    userResponse && dispatch(removeAllFromWishList())
  }

  return <>
      <button className="hover:text-gray-900 transition duration-200" onClick={handleClearAll}>Limpar tudo</button>
  </>
}

export default WishListCleanALL
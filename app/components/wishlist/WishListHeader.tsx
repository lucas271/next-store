import { BsHeart } from "react-icons/bs"

const WishListHeader = ({className}: {className?: string}) => {
  return <>
    <header className={`w-full ${className} border-b-2 px-4 flex items-center justify-between text-gray-700`}>
      <h2 className="flex items-center gap-2 text-xl"><BsHeart color="red"/> Favoritos </h2>
      <button className="hover:text-gray-900 transition duration-200">Limpar tudo</button>
    </header>
  </>
}

export default WishListHeader
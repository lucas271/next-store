import { BsBag, BsHeart, BsPerson } from "react-icons/bs";
import Link from "next/link";

export default function IconLinkItems({isHamburguer=false, className} : {isHamburguer?: boolean, className?:string}){
  return <>
    <li className={className}>
      <Link href={'/wishList'} className="hover:text-gray-700 h-full w-full">                     
        <BsHeart
        className={`cursor-pointer transition duration-200 sm:inline ${isHamburguer && 'absolute'} h-full top-0`}
        aria-label='Login'
        />
        {isHamburguer ? 'Favoritos': ''}
      </Link>
    </li>
    <li className={className}>
      <Link href={'/cart'} className="hover:text-gray-700 h-full w-full ">
        <BsBag
        className={` cursor-pointer transition duration-200 sm:inline ${isHamburguer && 'absolute'} h-full top-0`}
        aria-label='Carrinho de compras'
        />
        {isHamburguer && "carrinho"}
      </Link>
    </li>
    <li className={className}>
      <Link href={'/signIn'} className="hover:text-gray-700 h-full w-full">                     
        <BsPerson
        className={`cursor-pointer transition duration-200 sm:inline ${isHamburguer && 'absolute'} h-full top-0`}
        aria-label='Login'
        />
        {isHamburguer ? 'Entrar': ''}
      </Link>
    </li>

  </>
}
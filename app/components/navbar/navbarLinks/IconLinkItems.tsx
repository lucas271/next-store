import { BsBag, BsPerson, BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import StyledInput from "../../styledInput/StyledInput";


export default function IconLinkItems({isHamburguer=false, className} : {isHamburguer?: boolean, className?:string}){
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(isHamburguer)
  return <>
    <li className={isSearchOpen ? 'w-32': ''}>
        <BsSearch
        tabIndex={0}
        className={`cursor-pointer hover:text-gray-700 transition duration-200` + isSearchOpen && 'hidden'}
        aria-label='Pesquisar produto'
        /> 
    </li>
    <li className={className + 'w-fit'}>
      <Link href={'/cart'}>
        <BsBag
            tabIndex={0}
            className='cursor-pointer hover:text-gray-700 transition duration-200 sm:inline absolute h-full top-0'
            aria-label='Carrinho de compras'
        />
      </Link>
      {isHamburguer && "carrinho"}
    </li>
    <li className={className}>
      <Link href={'/signIn'}>                     
        <BsPerson
        tabIndex={0}
        className='cursor-pointer hover:text-gray-700 transition duration-200 sm:inline absolute h-full top-0'
        aria-label='Login'
        />
        {isHamburguer ? 'Entrar': ''}
      </Link>
    </li>
  </>
}
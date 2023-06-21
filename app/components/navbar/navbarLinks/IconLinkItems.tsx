import { BsBag, BsPerson, BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import StyledInput from "../../styledInput/StyledInput";

export default function IconLinkItems({isHamburguer=false, className} : {isHamburguer?: boolean, className?:string}){
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  return <>
    <li className={isSearchOpen ? 'w-32': ''}>
      {
        isSearchOpen ? <>
          <StyledInput Icon={BsSearch}/>
        </> : <>
          <BsSearch
          tabIndex={0}
          className={`cursor-pointer hover:text-gray-700 transition duration-200`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label='Pesquisar produto'
          /> 
        </>
      }
    </li>
    <li className={className}>
      <Link href={'/cart'} className="hover:text-gray-700">
        <BsBag
            className='cursor-pointer transition duration-200 sm:inline absolute h-full top-0'
            aria-label='Carrinho de compras'
        />
      {isHamburguer && "carrinho"}
      </Link>
    </li>
    <li className={className}>
      <Link href={'/signIn'} className="hover:text-gray-700">                     
        <BsPerson
        className='cursor-pointer transition duration-200 sm:inline absolute h-full top-0'
        aria-label='Login'
        />
        {isHamburguer ? 'Entrar': ''}
      </Link>
    </li>
  </>
}
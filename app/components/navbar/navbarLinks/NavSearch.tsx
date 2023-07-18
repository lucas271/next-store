"use client"
import SearchBar from "../../utility/searchBar/SearchBar"
import { useState } from "react"

const NavSearch = ({isHamburguer=false, className} : {isHamburguer?: boolean, className?:string}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  return <>
    <SearchBar className={`${className} w-full sm:text-sm md:text-lg`}/>
  </>
} 

export default NavSearch
import ReduxProvider from "../../../_providers/ReduxProvider"
import SearchBar from "../../shared/searchBar/SearchBar"

const NavSearch = ({className} : {className?:string}) => {

  return <>
    <SearchBar className={`${className} w-full sm:text-sm md:text-lg`}/>
  </>
} 

export default NavSearch
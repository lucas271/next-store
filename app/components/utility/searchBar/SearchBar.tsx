import { BsSearch } from "react-icons/bs"
import StyledInput from "../styledInput/StyledInput"

const SearchBar = ({className}: {className?: string}) => {
  return <>
    <StyledInput Icon={BsSearch} className={`text-2xl ${className}`}/>
  </>
}

export default SearchBar
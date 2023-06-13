import { BsTicket } from "react-icons/bs";
import StyledButton from "../../styledButton/StyledButton";
import StyledInput from "../../styledInput/StyledInput";

export default function CupomField(){
  return <>
    <StyledInput size="w-[60%] h-[80%] sm:h-full" Icon={BsTicket}/>
    <StyledButton text="Aplicar" className=' w-[40%] h-[80%] sm:h-full text-sm p-0'/>
  </>
}
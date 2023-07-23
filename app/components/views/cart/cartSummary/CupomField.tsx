import { BsTicket } from "react-icons/bs";
import StyledButton from "../../../utility/styledButton/StyledButton";
import StyledInput from "../../../utility/styledInput/StyledInput";

export default function CupomField(){
  return <>
    <div className="h-4/5 relative flex w-full">
      <StyledInput Icon={BsTicket}/>
      <StyledButton text="Aplicar" className=' w-[40%] h-[80%] sm:h-full text-sm p-0'/>
    </div>
  </>
}
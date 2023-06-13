import { BsLock, BsPersonCircle } from "react-icons/bs";
import StyledButton from "../styledButton/StyledButton";
import StyledInput from "../styledInput/StyledInput";
import { AiOutlineMail } from "react-icons/ai";

export default function AuthForm({isSignIn}: {isSignIn: boolean}){
  return <>
    <form action="" className=" mt-4 flex flex-col gap-6 ">
            <div className="space-y-2 w-full">
              { !isSignIn && 
                <StyledInput id="email" Icon={AiOutlineMail}/>
              }
                <StyledInput id="username" Icon={BsPersonCircle}/>
                <StyledInput type="password" id="password" Icon={BsLock}/>
              {!isSignIn &&
                <StyledInput type="password" id="password" Icon={BsLock}/>
              }
            </div>
            <StyledButton text={isSignIn ? 'Entrar': 'Criar'}/>
    </form>
  </>
}
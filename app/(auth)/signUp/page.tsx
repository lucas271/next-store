import StyledButton from "@/app/components/styledButton/StyledButton";
import StyledInput from "@/app/components/styledInput/StyledInput";
import Link from "next/link";
import {BsPersonCircle, BsLock} from 'react-icons/bs'
import {AiFillGoogleCircle, AiOutlineMail} from 'react-icons/ai'
import AuthFooter from "@/app/components/auth/AuthFooter";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthForm from "@/app/components/auth/AuthForm";

export default function login(){
   return <>
      <AuthHeader isSignIn={false}/>
      <div className="w-3/4 m-auto h-full flex justify-around flex-col">
         <AuthForm isSignIn={false}/>
         <AuthFooter isSignIn={false}/>
      </div>
      
   </>
}
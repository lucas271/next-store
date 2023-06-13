import AuthFooter from "@/app/components/auth/AuthFooter";
import AuthForm from "@/app/components/auth/AuthForm";
import AuthHeader from "@/app/components/auth/AuthHeader";
import StyledButton from "@/app/components/styledButton/StyledButton";
import StyledInput from "@/app/components/styledInput/StyledInput";
import Link from "next/link";
import { AiFillGoogleCircle } from "react-icons/ai";
import {BsPersonCircle, BsLock} from 'react-icons/bs'

export default function login(){
   return <>
      <AuthHeader isSignIn={true}/>
      <div className="w-3/4 m-auto h-full flex justify-around flex-col">
         <AuthForm isSignIn={true}/>
         <AuthFooter isSignIn={true}/>
      </div>
   </>
}
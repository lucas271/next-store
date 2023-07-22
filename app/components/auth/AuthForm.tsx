"use client"

import { BsLock, BsPersonCircle } from "react-icons/bs";
import StyledButton from "../utility/styledButton/StyledButton";
import StyledInput from "../utility/styledInput/StyledInput";
import { AiOutlineMail } from "react-icons/ai";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { SignInType, SignUpType, signInValidation, signUpValidation } from "./validateAuth";
import { useState } from "react";
import ErrorMessage from "../utility/errorMessage/ErrorMessage";

export default function AuthForm({isSignIn}: {isSignIn: boolean}){
  const [output, setOutput] = useState()

  const {register, handleSubmit, formState: {errors}} = useForm<typeof isSignIn extends true ? SignInType : SignUpType>({
    resolver: zodResolver(isSignIn ? signInValidation : signUpValidation)
  })
  const validate = (data: any) => {
    setOutput(data)
  }
  return <>
    <form action="" onSubmit={handleSubmit(validate)} className=" mt-4 flex flex-col gap-6 ">
            <div className="space-y-2 w-full">
              { !isSignIn && <>
                {errors.email?.message && <ErrorMessage message={errors.email.message}/>}
                <StyledInput id="email" Icon={AiOutlineMail} register={register} name="email" placeholder="Email"/>
              </>
              }
                {errors.username?.message && <ErrorMessage message={errors.username.message}/>}
                <StyledInput id="username" Icon={BsPersonCircle} register={register} name="username" placeholder="Nome de usuario"/>
                
                {errors.password?.message && <ErrorMessage message={errors.password.message}/>}
                <StyledInput type="password" id="password" Icon={BsLock} register={register} name="password" placeholder="Senha"/>
              {!isSignIn &&<>
                {errors.repeatPassword?.message && <ErrorMessage message={errors.repeatPassword.message}/>}
                <StyledInput type="password" id="repeatPassword" Icon={BsLock} register={register} name="repeatPassword" placeholder="Repetir a senha"/>
              </>
              }
            </div>
            <StyledButton text={isSignIn ? 'Entrar': 'Criar'}/>
    </form>
  </>
}
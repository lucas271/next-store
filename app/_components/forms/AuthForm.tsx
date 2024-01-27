"use client"
import { BsLock, BsPersonCircle } from "react-icons/bs";
import StyledButton from "../shared/styledButton/StyledButton";
import StyledInput from "../shared/styledInput/StyledInput";
import { AiOutlineMail } from "react-icons/ai";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { SignInType, SignUpType, signInValidation, signUpValidation } from "../../../util/authValidation";
import ErrorMessage from "../shared/errorMessage/ErrorMessage";
import {  registerUser } from "@/lib/services/slices/userSlicer";
import { useAppDispatch, useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { CircularProgress } from "@mui/material";
import { signIn, signOut, } from "next-auth/react";

export default function AuthForm({isSignIn}: {isSignIn: boolean}){
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  type AuthType = typeof isSignIn extends true ? SignInType : SignUpType
  const {register, handleSubmit, formState: {errors}} = useForm<AuthType>({
    resolver: zodResolver(isSignIn ? signInValidation : signUpValidation),
  })

  const validate = async (data: AuthType) => {
    if(!isSignIn){
      dispatch(registerUser(data))
    }else{
      signIn('credentials', {
        ...data
      })
    }
  }

  return <>
    {user.loading ? <div className="w-full flex align-middle justify-center"><CircularProgress size={'10vh'}/></div> :<>
      <form action="" onSubmit={handleSubmit(validate)} className=" mt-4 flex flex-col gap-6 ">
            <div className="space-y-2 w-full">
              {user.errors.map((error, index) => {
                return <h1 key={index}><ErrorMessage message={error}/></h1>
              })}
              {errors.email?.message && <ErrorMessage message={errors.email.message}/>}
              <StyledInput id="email" Icon={AiOutlineMail} register={register} name="email" placeholder="Email"/>
              
              { !isSignIn && <>               
                  {errors.name?.message && <ErrorMessage message={errors.name.message}/>}
                  <StyledInput id="username" Icon={BsPersonCircle} register={register} name="name" placeholder="Nome de usuario"/>
              </>}

              {errors.password?.message && <ErrorMessage message={errors.password.message}/>}
              <StyledInput type="password" id="password" Icon={BsLock} register={register} name="password" placeholder="Senha"/>
              {!isSignIn &&<>
                {errors.repeatPassword?.message && <ErrorMessage message={errors.repeatPassword.message}/>}
                <StyledInput type="password" id="repeatPassword" Icon={BsLock} register={register} name="repeatPassword" placeholder="Repetir a senha"/>
              </>
              }
            </div>
            <StyledButton text={isSignIn ? 'Entrar': 'Criar'}/>
            <button className='mt-64' onClick={() => signOut()}>sair</button>
      </form>
    </>
    }
  </>
}
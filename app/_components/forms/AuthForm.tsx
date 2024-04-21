"use client"
import { BsLock, BsPersonCircle } from "react-icons/bs";
import StyledButton from "../shared/styledButton/StyledButton";
import StyledInput from "../shared/styledInput/StyledInput";
import { AiOutlineMail } from "react-icons/ai";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { SignInType, SignUpType, signInValidation, signUpValidation } from "../../../util/authValidation";
import ErrorMessage from "../shared/errorMessage/ErrorMessage";
import {  useAppSelector } from "@/lib/services/reduxStore/storeHooks";
import { CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm({isSignIn}: {isSignIn: boolean}){
	const user = useAppSelector(state => state.user)
	const router = useRouter()

	const [email, setEmail] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [repeatPassword, setRepeatPassword] = useState<string>('')
	const [nextAuthErrors, setNextAuthErrors] = useState<string[]>([]) 
	const [loading, setLoading] = useState<boolean>(false)
  type AuthType = typeof isSignIn extends true ? SignInType : SignUpType
  const {register, handleSubmit, formState: {errors}} = useForm<AuthType>({
  	resolver: zodResolver(isSignIn ? signInValidation : signUpValidation),
  })

  const validate = async (data: AuthType) => {
	setLoading(true)
	return await signIn('credentials', {
		...data, type: isSignIn ? 'signIn' : 'signUp', redirect: false
	}).then((response) => {
		setLoading(false)
		if(response?.ok) return router.push('/')
		const errorParsed: {errors: string[]} = JSON.parse(String(response?.error)) || {errors: ['Não foi possivel entrar na conta :(']}
		setNextAuthErrors(errorParsed.errors)
	}).catch(() => setLoading(false))
  }

  return <>
  	{user.loading || loading ? <div className="w-full flex align-middle justify-center"><CircularProgress size={'10vh'}/></div> :<>
  		<form action="" onSubmit={handleSubmit(validate)} className=" mt-4 flex flex-col gap-6 ">
  			<div className="space-y-2 w-full">
  				{[...user.errors, ...nextAuthErrors].map((error, index) => {
  					return <span key={index}><ErrorMessage message={error}/></span>
  				})}
  				{errors.email?.message && <ErrorMessage message={errors.email.message}/>}
  				<StyledInput id="email" Icon={AiOutlineMail} register={register} name="email" placeholder="Email" value={email} onChange={setEmail}/>
              
  				{ !isSignIn && <>               
  					{errors.name?.message && <ErrorMessage message={errors.name.message}/>}
  					<StyledInput id="username" Icon={BsPersonCircle} register={register} name="name" placeholder="Nome de usuario" value={name} onChange={setName}/>
  				</>}

  				{errors.password?.message && <ErrorMessage message={errors.password.message}/>}
  				<StyledInput type="password" id="password" Icon={BsLock} register={register} name="password" placeholder="Senha" value={password} onChange={setPassword}/>
  				{!isSignIn &&<>
  					{errors.repeatPassword?.message && <ErrorMessage message={errors.repeatPassword.message}/>}
  					<StyledInput type="password" id="repeatPassword" Icon={BsLock} register={register} name="repeatPassword" placeholder="Repetir a senha" value={repeatPassword} onChange={setRepeatPassword}/>
  				</>
  				}
  			</div>
  			<StyledButton text={isSignIn ? 'Entrar': 'Criar'} className={'p-2'}/>
  		</form>
  	</>
  	}
  </>
}
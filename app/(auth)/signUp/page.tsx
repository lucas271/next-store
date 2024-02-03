import AuthHeader from "@/app/_components/pages/auth/AuthHeader";
import AuthForm from "@/app/_components/forms/AuthForm";
import AuthFooter from "@/app/_components/pages/auth/AuthFooter";

export default async function login(){
	return <>
		<AuthHeader isSignIn={false}/>
		<div className="w-3/4 m-auto h-full flex justify-around flex-col">
			<AuthForm isSignIn={false}/>
			<AuthFooter isSignIn={false}/>
		</div>
      
	</>
}
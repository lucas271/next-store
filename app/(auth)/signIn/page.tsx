import AuthForm from "@/app/_components/forms/AuthForm";
import AuthFooter from "@/app/_components/pages/auth/AuthFooter";
import AuthHeader from "@/app/_components/pages/auth/AuthHeader";

export default function Login(){
	return <>
		<AuthHeader isSignIn={true}/>
		<div className="w-3/4 m-auto h-full flex justify-around flex-col">
			<AuthForm isSignIn={true}/>
			<AuthFooter isSignIn={true}/>
		</div>
	</>
}


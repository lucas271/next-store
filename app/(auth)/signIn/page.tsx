import AuthFooter from "@/app/components/auth/AuthFooter";
import AuthForm from "@/app/components/auth/AuthForm";
import AuthHeader from "@/app/components/auth/AuthHeader";

export default function login(){
   return <>
      <AuthHeader isSignIn={true}/>
      <div className="w-3/4 m-auto h-full flex justify-around flex-col">
         <AuthForm isSignIn={true}/>
         <AuthFooter isSignIn={true}/>
      </div>
   </>
}
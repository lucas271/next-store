import AuthFooter from "@/app/components/views/auth/AuthFooter";
import AuthForm from "@/app/components/views/auth/AuthForm";
import AuthHeader from "@/app/components/views/auth/AuthHeader";

export default function login(){
   return <>
      <AuthHeader isSignIn={true}/>
      <div className="w-3/4 m-auto h-full flex justify-around flex-col">
         <AuthForm isSignIn={true}/>
         <AuthFooter isSignIn={true}/>
      </div>
   </>
}
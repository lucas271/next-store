import AuthFooter from "@/app/components/views/auth/AuthFooter";
import AuthHeader from "@/app/components/views/auth/AuthHeader";
import AuthForm from "@/app/components/views/auth/AuthForm";

export default function login(){
   return <>
      <AuthHeader isSignIn={false}/>
      <div className="w-3/4 m-auto h-full flex justify-around flex-col">
         <AuthForm isSignIn={false}/>
         <AuthFooter isSignIn={false}/>
      </div>
      
   </>
}
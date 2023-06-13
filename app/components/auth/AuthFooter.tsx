import Link from "next/link";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function AuthFooter({isSignIn}: {isSignIn: boolean}){
  return <>
    <footer className="text-gray-600">
      <div className={`flex justify-center ${isSignIn && 'mb-3'} `}>
        <AiFillGoogleCircle className="h-8 w-8 cursor-pointer hover:text-gray-800 transition duration-200"/>
      </div>
      <p className="text-center ">{isSignIn ? 'Não tem uma conta?' : 'Já tem uma conta?'}<br/>
        <Link href={isSignIn ? '/signUp' : '/signIn'} className={`font-bold mt-2 hover:text-gray-800 transition duration-200`}>
        {isSignIn ? 'Cadastre-se.' : 'Entre'}
        </Link> 
      </p>
    </footer>
  </>
}
import { BsArrowReturnLeft } from "react-icons/bs";
import Link from "next/link";


export default function AuthHeader({isSignIn}: {isSignIn: boolean}){
  return <>
      <Link href={'/'} className='flex items-center gap-2 hover:text-gray-600 transition duration-400 cursor-pointer text-gray-400'><BsArrowReturnLeft/> HOME</Link>
      <h1 className="text-center text-2xl">{isSignIn ? 'Login': 'Cadastre-se'}</h1>
  </>
}
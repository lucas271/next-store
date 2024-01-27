import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BsCart} from "react-icons/bs";
import CartInfo from '@/app/_components/cart/CartInfo'

export default async function Cart(){
  const session = await getServerSession()
  if(!session?.user) return redirect('/')

  return <>
  <div className="w-screen h-screen-minus-nav relative overflow-x-hidden">
    {/*cart Header*/ }
    <header className="h-[7%] sm:h-[10%] flex items-center pl-2 gap-4 text-2xl border-b-2 font-bold p-1">
      <BsCart/> 
      <h1 className="text-lg sm:text-2xl mt-1">Meu Carrinho</h1>
    </header>

    {/*Cart info*/ }

    <div className="h-[93%] sm:h-[90%] flex gap-2 sm:px-3 px-1 pb-2 justify-center items-center">
        <CartInfo/>
    </div>

  </div>
  </>
}
import Image from "next/image";

const items = [{
   img: '/splash.jpg',
   title: 'Bunda mole ite2m',
   text: 'Esse item de bunda mole so serve para pessoas bunda moles. não tem pq comprar cara se vc é normal.',
   price: 32.64
},
{
   img: '/splash.jpg',
   title: 'Bunda mole it1em',
   text: 'Esse item de bunda mole so serve para pessoas bunda moles. não tem pq comprar cara se vc é normal.',
   price: 32.64
},
{
   img: '/splash.jpg',
   title: 'Bunda mole item',
   text: 'Esse item de bunda mole so serve para pessoas bunda moles. não tem pq comprar cara se vc é normal.',
   price: 32.64
}
]

export default function Carrousel(){
   return <>
      <section className="min-w-screen min-h-screen-minus-nav bg-white relative" id="carrousel">
         <div className="container h-full min-h-screen-minus-nav w-full m-auto grid grid-cols-2 sm:grid-cols-3 md:gap-6 sm:gap-2 gap-6 px-2 gap-y-6 relative sm:p-0 py-6">
            {items.map((item, index) => {
               return <div key={item.title} className={`rounded-md sm:self-center  lg:h-4/6 md:h-2/5 sm:h-2/6 relative overflow-hidden ${index === 2 ? 'col-span-2 sm:col-span-1 self-start h-full' : 'self-center h-1/2 col-span-1'} `} tabIndex={0}>
                  <div className="w-full h-full transition duration-[3500ms] ease-out hover:scale-150 cursor-pointer relative">
                     <div className="h-full w-full relative">
                        <Image  src={item.img} alt={item.img} fill sizes="100%"/>
                     </div>
                     <h2 className="absolute h-full w-full top-0 left-0 flex justify-center items-center text-white">Garrafa</h2>
                  </div>
               </div>
            })}
         </div>
      </section>
   </>
}
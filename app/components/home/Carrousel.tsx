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
      <section className="min-w-screen min-h-screen-minus-nav" id="carrousel">
         <div className="container h-full min-h-screen-minus-nav w-full m-auto mt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 px-2 gap-y-6">
            {items.map((item, index) => {
               return <div key={item.title} className={`col-span-1 text-centerbg-yellow-200 rounded-md h-4/5 relative overflow-hidden ${index === 2 ? 'col-span-2 self-start sm:self-center sm:col-span-1': "sm:self-center self-end"} `} tabIndex={0}>
                  <div className="w-full h-full transition duration-[3500ms] ease-out hover:scale-150 cursor-pointer">
                     <div className="h-full w-full">
                        <Image  src={item.img} alt={item.img} fill/>
                     </div>
                     <h2 className="absolute h-full w-full top-0 left-0 flex justify-center items-center text-white">Garrafa</h2>
                  </div>
               </div>
            })}
         </div>
      </section>
   </>
}
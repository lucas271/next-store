const items = [{
   img: '/splash.jpg',
   title: 'Bunda mole item',
   text: 'Esse item de bunda mole so serve para pessoas bunda moles. não tem pq comprar cara se vc é normal.',
   price: 32.64
},
{
   img: '/splash.jpg',
   title: 'Bunda mole item',
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
      <section className="min-w-screen min-h-screen-minus-nav">
         <div className="container h-full min-h-screen-minus-nav w-full m-auto mt-4 grid grid-cols-3 items-center justify-center">
            {items.map((item, index) => {
               return <div key={item.img} className={`m-auto col-span-1  text-center bg-yellow-200 rounded-md w-64 h-96 relative overflow-hidden ${index === 2 && 'l:w-64'} `}>
                  <div className="w-full h-full transition duration-[3500ms] ease-out hover:scale-150 cursor-pointer">
                     <img className="h-full w-full" src={item.img} alt="" />
                     <h2 className="absolute h-full w-full top-0 left-0 flex justify-center items-center text-white">Garrafa</h2>
                  </div>
               </div>
            })}
         </div>
      </section>
   </>
}
import Image from "next/image";

const items = [{
	img: '/splash.jpg',
	title: 'Bunda mole ite2m',
	text: 'Esse item de bunda mole so serve para pessoas bunda moles. não tem pq comprar cara se vc é normal.',
	price: 32.64
},
{
	img: '/splash.jpg',
	img2: '/bottle.png',
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
		<section className="min-w-screen h-screen-minus-nav flex flex-col justify-center items-center gap-6 py-6 px-2 bg-white relative text-slate-800" id="carrousel">
			<h2 className="font-bold uppercase text-2xl">destaques</h2>
			<div className="h-3/4 flex-shrink w-full grid grid-cols-2 sm:grid-cols-3 md:gap-6 sm:gap-2 gap-6 relative container">
				{items.map((item, index) => {
					return <div key={item.title} className={`rounded-md self-start sm:self-center cursor-pointer lg:h-4/6 md:h-2/5 sm:h-2/6 relative overflow-hidden ${index === 2 ? 'col-span-2 sm:col-span-1  h-full' : 'h-3/4 col-span-1 self-center'} `} tabIndex={0}>
						<div className="w-full h-full group">
							<div className="h-full w-full transition duration-[3500ms] ease-out group-hover:scale-150 cursor-pointer relative">
								<Image  src={item.img} alt={item.img} fill sizes="100%"/>
							</div>
							<span className="absolute top-0 h-full w-full  flex justify-center items-center text-white">
								<div className="rotate-12 absolute my-auto h-5/6 w-5/6 bg-black rounded-full backdrop-blur-3xl opacity-70 blur-3xl">

								</div>
								<span className="h-2/3 w-3/4 sm:h-1/2 lg:w-1/2 rotate-12 sm:w-2/3">{item.img2 && <Image  src={item.img2} alt={item.img2}  sizes="100%" fill/>}</span>
								<span className="absolute bottom-5 transition-all group-hover:text-white group-hover:opacity-100 opacity-0 duration-500 group-hover:bg-opacity-30 bg-opacity-0 px-3 bg-black text-sm sm:text-xl shadow-slate-400 uppercase text-transparent">{item.title}</span>
							</span>
						</div>
					</div>
				})}
			</div>
		</section>
	</>
}
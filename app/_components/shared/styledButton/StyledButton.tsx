//might consider modularizing button variants, but I don't think it will be necessary

export enum ButtonVariants{
  PRIMARY = "primary",
  SECONDARY = "secondary",
  GOPINKY = "goPinky" 
}


export default function StyledButton({className, text, onClick, variant=ButtonVariants.PRIMARY}: {className?: String, text:string, onClick?: () => void, variant?: ButtonVariants}){
  
	const btnStyles = {
		[ButtonVariants.PRIMARY]: "from-slate-800 to-slate-100 text-slate-100 hover:text-slate-800",
		[ButtonVariants.SECONDARY]: "from-slate-100 to-slate-800 text-slate-800 hover:text-slate-100",
		[ButtonVariants.GOPINKY]: 'from-transparent to-red-300 text-slate-50 hover:text-slate-800'
	}

	return <>
		<button className={`${className} ${btnStyles[variant]} border-2 rounded-md uppercase bg-gradient-to-l from-50%  to-50% bg-[length:200%_100%] bg-right-bottom hover:bg-left-bottom duration-300 transition-all cursor-pointer`
		}
		onClick={onClick}
		>
			{text}
		</button>
	</>
}
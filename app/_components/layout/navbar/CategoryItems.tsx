import Link from "next/link";

export default function CategoryItems({className}: {className?: string}){
	return <>
		<li className={ 'border-b-0 uppercase ' + className } tabIndex={0}>
			<Link href={"/item"}>
				Todos os items
			</Link>
		</li>
	</>
}
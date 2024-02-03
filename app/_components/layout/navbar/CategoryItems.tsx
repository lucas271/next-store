export default function CategoryItems({className}: {className?: string}){
	return <>
		<li className={className} tabIndex={0}>
			<p
				className='cursor-pointer hover:text-gray-700 transition duration-200'
				aria-label='acessórios'
			>
          acessórios
			</p>
		</li>
		<li className={ 'border-b-0 ' + className } tabIndex={0}>
			<p
				className='cursor-pointer hover:text-gray-700 transition duration-200 whitespace-nowrap'
				aria-label='Recipiente térmicos'
			>
          Recipientes térmicos
			</p>
		</li>
	</>
}
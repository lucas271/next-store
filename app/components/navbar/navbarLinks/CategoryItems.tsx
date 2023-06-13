export default function CategoryItems({className}: {className?: string}){
  return <>
      <li className={className}>
        <p
          tabIndex={0}
          className='cursor-pointer hover:text-gray-700 transition duration-200'
          aria-label='acessórios'
        >
          acessórios
        </p>
      </li>
      <li className={ 'border-b-0 ' + className }>
        <p
          tabIndex={0}
          className='cursor-pointer hover:text-gray-700 transition duration-200'
          aria-label='Recipiente térmicos'
        >
          Recipientes térmicos
        </p>
      </li>
  </>
}
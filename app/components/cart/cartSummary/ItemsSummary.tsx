import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsTrash } from "react-icons/bs";
import Image from 'next/image'

export default function ItemsSummary(){
  return <>
  <ul className="space-y-2">
    <li>
      <div className="flex gap-2 justify-between items-center py-3 px-1 relative">
        <BsTrash className="absolute top-0 right-1 transition duration-200 cursor-pointer bg-yellow text-red-600 hover:text-red-800"/>
        <Image src='/bottle.png' alt="bottle" width={30} height={30}/>
        <div className="utils flex gap-3">
          <button><BsFillArrowLeftCircleFill/></button>
          <span>3</span>
          <button><BsFillArrowRightCircleFill/></button>
        </div>
        <span>R${(30).toFixed(2).replace('.',',')}</span>
      </div>
    </li>
  </ul>
  </>
}
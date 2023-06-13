import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  Icon?: React.ElementType;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  id?: string;
  className?: string;
  size?: string
  value?: string
}

export default function StyledInput({ Icon, type='text', placeholder='', id, className='', size='', value=''}: InputProps) {
  return (
    <div className={`text-gray-400 relative focus-within:text-gray-800 ${size}`}>
      {Icon && <label htmlFor={id}><Icon className="absolute h-full ml-2" /></label>}
      <input 
        type={type}
        placeholder={placeholder} 
        id={id} 
        className={`${className} h-full w-full py-2 ${Icon ? 'pl-7' : 'pl-1.5'} border-2 rounded-md text-gray-800 outline-none focus:border-gray-600 `}
        value={value}
      /> 
    </div>
  );
}
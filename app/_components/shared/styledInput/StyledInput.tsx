import { ChangeEvent, Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  Icon?: React.ElementType;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
  size?: string;
  value?: string;
  register?: UseFormRegister<any>
  setValue?: Dispatch<SetStateAction<string>>
  name?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>,
  onFocus?: () => void
}

export default function StyledInput({ Icon, type='text', placeholder='', id='input', className='', onChange, register, setValue, name='', onFocus}: InputProps) {


	return (
		<div className={`text-gray-400 relative focus-within:text-gray-800 w-full max:h-fit`}>
			{Icon && <label htmlFor={id} ><Icon className="absolute h-full ml-2" /></label>}
			<input 
				type={type}
				placeholder={placeholder} 
				id={id} 
				onFocus={onFocus}
				className={`${className} h-full w-full py-2 ${Icon ? 'pl-8' : 'pl-1.5'} border-2 rounded-md text-gray-800 outline-none focus:border-gray-600 `}
				{...register && {...register(name)}}
				name={name}
				onChange={(e) => onChange &&  onChange(e)}
			/> 
		</div>
	);
}
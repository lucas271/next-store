const ErrorMessage = ({message, className}: {message: string, className?: string}) => {
	return <>
		<span className={`block text-red-700 uppercase ${className}`}>{message}</span>
	</>
}

export default ErrorMessage
export default function StyledButton({className, text, onClick}: {className?: String, text:string, onClick?: React.MouseEventHandler}){
  return <>
      <button className={`
        p-3 border-2 rounded-md uppercase bg-200
        button_styled
        ${className}
        `
      }
      onClick={onClick}
      >
        {text}
      </button>
</>
}
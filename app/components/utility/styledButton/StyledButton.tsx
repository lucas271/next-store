export default function StyledButton({className, text, onClick, bgColor, bgHoverColor}: {className?: String, text:string, onClick?: React.MouseEventHandler, bgColor?: 'string', bgHoverColor?: 'string'}){
  return <>
      <button className={`
        ${className}
        p-3 border-2 rounded-md uppercase
        bg-gradient-to-r from-${bgColor ? bgColor : 'white'} to-${bgHoverColor ? bgHoverColor: 'gray-800'} bg-right bg-no-repeat bg-cover transition duration-500 ease-out hover:bg-left">

        `
      }
      onClick={onClick}
      >
        {text}
      </button>
</>
}
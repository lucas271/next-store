import Link from "next/link";

export default function Logo(){
  return <>
    <h1
      tabIndex={0}
      className="cursor-pointer hover:text-gray-700 transition duration-200 z-50"
      aria-label="Logo"
    >
      <Link href={'/'}>LOGO</Link>
    </h1>
  </>
}
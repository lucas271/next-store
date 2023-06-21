import Link from "next/link";

export default function Logo(){
  return <>
    <Link href={'/'} tabIndex={-1}>
      <h1
        tabIndex={0}
        className="cursor-pointer hover:text-gray-700 transition duration-200 z-50"
        aria-label="Logo"
      >
        LOGO
      </h1>
    </Link>
  </>
}
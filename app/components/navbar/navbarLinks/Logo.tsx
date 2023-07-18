import Link from "next/link";

export default function Logo(){
  return <>
    <Link href={'/'} tabIndex={-1} className="z-50">
      <h1
        tabIndex={0}
        className="cursor-pointer hover:text-gray-700 transition duration-200 text-2xl lg:text-3xl"
        aria-label="Logo"
      >
        LOGO
      </h1>
    </Link>
  </>
}
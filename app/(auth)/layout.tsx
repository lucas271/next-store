export default async function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (

		<main className=" flex items-center relative h-[100vh] w-full">
			<section className="container text-gray-800 m-auto w-5/6 md:w-3/4 shadow-2xl p-4 relative flex flex-col gap-4 h-[90%]">
				{children}
			</section>
		</main>         

	)
}


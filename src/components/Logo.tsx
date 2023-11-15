import Link from "next/link";

function Logo() {
	return (
		<Link
			href='/'
			className='font-bold md:text-3xl text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer'
		>
			Form Builder
		</Link>
	);
}

export default Logo;

import Link from 'next/link'
export default function Home() {

    return (
        <div className="p-40">
            <h1 className="text-4xl m-2 font-bold text-center">Shopping made simple for everyone</h1>
            <p className="text-lg m-2 text-center">Welcome to the E-Market</p>
            <div className="flex justify-center">
                <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">Shop Now</Link>
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">Sign Up</Link>
            </div>
        </div>
    );
}

// Sign Up href not linked as wip
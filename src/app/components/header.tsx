import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="w-full bg-neutral text-neutral-content p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">My App</h1>
         <nav className="flex gap-4">
         <Link href="/" className="hover:underline">Home</Link>
         <Link href="/about" className="hover:underline">About</Link>
         <Link href="/contact" className="hover:underline">Contact</Link>
         </nav>
      </header>
    </div>
  )
}

export default Header
'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="container mx-auto p-6 flex items-center justify-between">
      <Link href="#hero" className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-bl from-green-400 to-emerald-600 flex items-center justify-center font-bold text-[#062017]">RB</div>
        <div>
          <h1 className="text-xl font-semibold">ReBo</h1>
          <p className="text-xs text-slate-400">Minecraft Bedrock Developer</p>
        </div>
      </Link>
      <nav className="hidden md:flex items-center gap-4 text-sm text-slate-300">
        <Link href="#projects" className="hover:underline">Projects</Link>
        <Link href="#about" className="hover:underline">About</Link>
        <Link href="#skills" className="hover:underline">Skills</Link>
        <Link href="#contact" className="hover:underline">Contact</Link>
        <button
          className="ml-3 px-3 py-1 rounded-md glass"
          onClick={() => document.documentElement.classList.toggle('light')}
        >Toggle</button>
      </nav>
      <button
        className="md:hidden p-2 glass rounded-md"
        onClick={() => setOpen(true)}
      >Menu</button>
      {/* mobile menu placeholder */}
    </header>
  )
}
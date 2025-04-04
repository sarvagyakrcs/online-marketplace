import Link from 'next/link'

import { IconLink } from '../components/icon-link'
import { PROJECT_NAME } from '@/metadata'
import { ShoppingBag } from 'lucide-react'

export function Intro() {
  return (
    <>
      <div>
      <Link href="/">
        <span className="text-3xl text-white font-bold">{PROJECT_NAME.toLocaleUpperCase()}</span>
      </Link>
      </div>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        Bringing Authentic{' '}
        <span className="text-sky-300">Indian Handicrafts</span>{' '}to the World
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300 text-justify">
        Mashno is your gateway to India&apos;s rich artistic heritage. We connect you with genuine, handcrafted products at fair prices, directly supporting local artisans and preserving historical traditions. No middlemen, no inflated costs—just authentic craftsmanship, delivered with integrity.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
        <IconLink href="/" icon={ShoppingBag} className="flex-none">
          Visit Store
        </IconLink>
      </div>
    </>
  )
}

export function IntroFooter() {
  return (
    <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
      Proudly supporting Indian artisans with{' '}
      <IconLink href="#" compact>
        Mashno
      </IconLink>
    </p>
  )
}

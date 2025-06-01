"use client"
import React, { useState } from 'react';
import { Navbar, NavbarSection, NavbarItem, NavbarLabel, NavbarDivider, NavbarSpacer } from '@/components/ui/navbar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import useCart from '@/hooks/use-cart';
import { SearchIcon, ShoppingBagIcon, UserIcon } from '../../constants/icons';
import { Logo } from '@/components/global/logo';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import SignInForm from '@/modules/auth/components/sign-in-component';
import { SearchDialog } from './search-input';
import { Session } from 'next-auth';
import UserButton from './user-button';
import SignUpForm from '@/modules/auth/components/sign-up-component';

const EcommerceNavbar = ({ session } : {session : Session | null}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    items: cartItems,
    cartTotal: totalPrice
  } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const categories = [
    "Art",  
    "Toys",  
    "Pottery",  
    "Weaves",  
    "Jewelry",  
    "Decor"
];
  
  return (
    <>
      <header className="border-b border-zinc-200 dark:border-zinc-800 z-40">
        <div className="mx-auto max-w-7xl px-4">
          <Navbar>
            {/* Logo */}
            <Logo />
            
            <NavbarDivider className="hidden md:block" />
            
            {/* Categories - Hidden on mobile */}
            <NavbarSection className="hidden md:flex">
              {categories.map((category, index) => (
                <NavbarItem key={index} href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <NavbarLabel>{category}</NavbarLabel>
                </NavbarItem>
              ))}
            </NavbarSection>
            
            <NavbarSpacer />
            
            {/* Mobile Menu Button */}
            <NavbarItem className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </NavbarItem>
            
            {/* Search */}
            <SearchDialog />
            
            {/* User Account */}
            { session ? <UserButton session={session} /> : <SignInForm type='modal' modalLabel='both' />}
            { session ? <SignUpForm type='modal' modalLabel='icon' /> : <SignUpForm type='modal' modalLabel='both' />}
            
            {/* Cart Button */}
            <Link href={"/cart"}>
              <div className="relative">
                <ShoppingBagIcon className="h-6 w-6" />
                <Badge color='emerald' className="absolute -top-2 -right-2">
                  {totalItems}
                </Badge>
              </div>
              <span className="sr-only">Cart</span>
            </Link>
          </Navbar>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-900 md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4">
            <Logo />
            <button onClick={() => setMobileMenuOpen(false)}>
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="mt-4 px-4">
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block py-2 text-lg font-medium"
                  >
                    {category}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="flex items-center py-2 text-lg font-medium">
                  <SearchIcon className="mr-2 h-5 w-5" />
                  Search
                </Link>
              </li>
              <li>
                <Link href="/account" className="flex items-center py-2 text-lg font-medium">
                  <UserIcon className="mr-2 h-5 w-5" />
                  My Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <DialogTitle>Your Shopping Cart</DialogTitle>
        <DialogDescription>You have {totalItems} items in your cart</DialogDescription>
        
        <DialogBody>
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500">Your cart is empty</p>
            )}
            
            {cartItems.length > 0 && (
              <>
                <Divider />
                
                <div className="flex items-center justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${totalPrice.toFixed(2)}</p>
                </div>
              </>
            )}
          </div>
        </DialogBody>
        
        <DialogActions>
          <Button onClick={() => setIsCartOpen(false)} outline>
            Continue Shopping
          </Button>
          {cartItems.length > 0 && (
            <Button href="/checkout" color="indigo">
              Checkout
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EcommerceNavbar;
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChartPie, ListTodo, LogOut, Menu, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { clientPaths } from '@/utils/paths';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href={clientPaths.home} className="flex items-center gap-2">
            <Image src="/leoni.png" alt="Logo" width={100} height={32} />
          </Link>
        </div>

        {/* Navigation links - hidden on mobile */}
        <div className="hidden md:flex md:items-center md:gap-10">
          <div className="space-y-2">
            <Link
              href={clientPaths.operators}
              className={clsx(
                'flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary'
              )}
            >
              <Users /> Gestion d’operateurs
            </Link>
            {pathname.endsWith(clientPaths.operators) && (
              <div className="w-full h-1 bg-black rounded-md"></div>
            )}
          </div>

          <div className="space-y-2">
            <Link
              href={clientPaths.absences}
              className="flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary"
            >
              <ListTodo /> Gestion d’absence
            </Link>
            {pathname.endsWith(clientPaths.absences) && (
              <div className="w-full h-1 bg-black rounded-md"></div>
            )}
          </div>

          <div className="space-y-2">
            <Link
              href={clientPaths.postes}
              className="flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary"
            >
              <ChartPie /> Etats des Postes
            </Link>
            {pathname.endsWith(clientPaths.postes) && (
              <div className="w-full h-1 bg-black rounded-md"></div>
            )}
          </div>
        </div>

        {/* Logout button on the right */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hidden md:flex"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-6">
                <Link
                  href="/dashboard"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mt-4 justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

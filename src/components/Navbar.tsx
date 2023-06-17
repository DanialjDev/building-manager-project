'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { menuVariants } from '@/animation/variants';
import { useAppSelector } from '@/hooks/reduxHooks';

const NavItem = ({ href, text }: { href: string; text: string }) => {
   const pathname = usePathname();
   return (
      <li className="w-full flex lg:px-4 p-2 lg:mx-5">
         <Link
            className={`w-full p-1 hover:text-cyan-600 transition duration-200 rounded-md ${
               pathname === href &&
               'bg-zinc-100 text-cyan-600 lg:bg-transparent'
            }`}
            href={href}
         >
            {text}
         </Link>
      </li>
   );
};

const Menu: React.FC = ({}) => {
   return (
      <ul className="lg:flex hidden w-[600px] bg-transparent items-center justify-between border-none">
         <NavItem href="/" text="صفحه اصلی" />
         <NavItem href="/poll" text="نظرسنجی" />
         <NavItem href="/about-us" text="درباره ما" />
         <NavItem href="/contact-us" text="تماس با ما" />
      </ul>
   );
};

const Navbar = () => {
   const [nav, setNav] = useState(false);
   const { first_name, last_name } = useAppSelector(
      (state) => state.user.instances
   );

   return (
      <div className="w-full h-20 bg-white shadow-none lg:shadow-md flex justify-around items-center fixed top-0 z-10">
         <div className="w-[120px] h-[140px] bg-cyan-900 hidden lg:flex" />
         <AnimatePresence mode="wait">
            {nav && (
               <motion.ul
                  variants={menuVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`lg:!hidden lg:bg-transparent bg-zinc-50 mx-3 absolute top-20 right-5 lg:border-none w-[200px] flex-col lg:shadow-none shadow-lg rounded-lg origin-top-right`}
               >
                  <NavItem href="/" text="صفحه اصلی" />
                  <NavItem href="/poll" text="نظرسنجی" />
                  <NavItem href="/about-us" text="درباره ما" />
                  <NavItem href="/contact-us" text="تماس با ما" />
               </motion.ul>
            )}
         </AnimatePresence>
         <Menu />
         <div className="lg:flex lg:relative absolute left-8 lg:top-0 top-8 items-center mx-3 border-2 p-1 rounded-md border-cyan-600">
            {first_name && last_name ? (
               <p className="px-2 py-1">{`${first_name} ${last_name}`}</p>
            ) : (
               <>
                  <Link href="/login" className="py-1 mx-3 hover:text-cyan-600">
                     ورود
                  </Link>
                  |
                  <Link
                     className="py-1 mx-3 hover:text-cyan-600"
                     href="/register"
                  >
                     عضویت
                  </Link>
               </>
            )}
         </div>

         <div
            className="fixed bg-zinc-50 top-5 right-7 w-14 h-14 shadow-xl rounded-full flex lg:hidden justify-center items-center cursor-pointer transition duration-200 hover:scale-90 active:scale-[0.8]"
            onClick={() => setNav((pervState) => !pervState)}
         >
            <div className="w-full h-[32%] flex flex-col justify-between items-center relative">
               <span
                  className={`w-[50%] absolute ${
                     nav && 'rotate-45 translate-y-2'
                  } transition top-0 h-[2.2px] bg-slate-900 rounded-2xl`}
               ></span>
               <span
                  className={`w-[50%] absolute ${
                     nav && 'opacity-0'
                  } transition top-2 h-[2.2px] bg-slate-900 rounded-2xl`}
               ></span>
               <span
                  className={`w-[50%] absolute ${
                     nav && '-rotate-45 -translate-y-2'
                  } transition top-4 h-[2.2px] bg-slate-900 rounded-2xl`}
               ></span>
            </div>
         </div>
      </div>
   );
};

export default Navbar;

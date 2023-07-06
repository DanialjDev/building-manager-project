'use client';

import DashboardMenu from '@/components/DashboardMenu';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
   const [nav, setNav] = useState(false);
   const { back } = useRouter();

   const token = Cookies.get('access_token');

   useEffect(() => {
      if (!token) {
         back();
      }
   }, []);
   return (
      <section className="w-full h-screen flex flex-col">
         <BiMenu
            onClick={() => setNav(true)}
            size={25}
            className="absolute top-4 right-4 cursor-pointer"
         />
         <DashboardMenu nav={nav} setNav={setNav} />
         <div className="w-full h-full mt-14 px-4">{children}</div>
      </section>
   );
};

export default DashboardLayout;

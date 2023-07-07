import React from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiLogOut } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const DashboardMenuItem = ({ text, href }: { text: string; href: string }) => {
   const pathname = usePathname();
   return (
      <Link
         className={`py-2 px-10 rounded-full shadow-lg hover:bg-[#cc000091] transition duration-200 ${
            pathname === href ? 'bg-[#cc000091]' : 'bg-white'
         }`}
         href={href}
      >
         {text}
      </Link>
   );
};

const DashboardMenu = ({
   nav,
   setNav,
}: {
   nav: boolean;
   setNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   const { first_name, last_name } = useAppSelector(
      (state) => state.user.instances
   );
   return (
      <div
         className={`w-[280px] absolute ${
            !nav ? 'right-[-280px]' : 'right-0'
         } transition-all duration-300 h-full bg-white z-50 border-l-2 border-l-red`}
      >
         <MdClose
            size={25}
            onClick={() => setNav(false)}
            className="absolute top-4 left-4 cursor-pointer"
         />
         <div className="w-full h-[80%] flex flex-col justify-between items-center mt-14">
            <div className="w-full h-[60%] flex flex-col justify-between">
               <div className="w-full flex justify-center items-center">
                  <p className="text-lg">{`${first_name} ${last_name}`}</p>
               </div>
               <ul className="w-full h-[75%] flex flex-col justify-between items-center">
                  <DashboardMenuItem href="/account/dashboard" text="داشبورد" />
                  <DashboardMenuItem href="/account/profile" text="پروفایل" />
                  <DashboardMenuItem href="/account/support" text="پشتیبانی" />
                  <DashboardMenuItem href="/account/poll" text="نظر سنجی" />
               </ul>
            </div>
            <button className="w-[100px] px-4 py-2 rounded-md text-light-gray flex justify-around items-center bg-red">
               <BiLogOut />
               <p>خروج</p>
            </button>
         </div>
      </div>
   );
};

export default DashboardMenu;

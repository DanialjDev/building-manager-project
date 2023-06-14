import ReduxProvider from '@/redux/provider';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
   title: 'مدیریت ساختمان',
   description: 'Generated by create next app',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" dir="rtl">
         <body>
            <ReduxProvider>
               <Navbar />
               {children}
            </ReduxProvider>
         </body>
      </html>
   );
}

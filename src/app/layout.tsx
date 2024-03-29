import ReduxProvider from '@/layout/provider';
import './globals.css';
import Navbar from '@/components/Navbar';
import MainLayout from '@/layout/MainLayout';

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
               <MainLayout>{children}</MainLayout>
            </ReduxProvider>
         </body>
      </html>
   );
}

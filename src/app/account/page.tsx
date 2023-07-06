import { useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Account = () => {
   const { push } = useRouter();
   const { is_email_activated, is_phone_activated, first_name } =
      useAppSelector((state) => state.user.instances);

   useEffect(() => {
      if (is_email_activated || is_phone_activated || first_name) push('/');
   }, []);
   return <></>;
};

export default Account;

import { Variants } from 'framer-motion';

export const menuVariants: Variants = {
   initial: {
      scale: 0.4,
      display: 'none',
      opacity: 0,
   },
   animate: {
      scale: 1,
      opacity: 1,
      display: 'flex',
      transition: {
         type: 'spring',
         bounce: 0.4,
         duration: 0.6,
      },
   },
   exit: {
      opacity: 0,
      scale: 0.4,
      transition: {
         type: 'spring',
         bounce: 0.4,
         duration: 0.6,
      },
   },
};

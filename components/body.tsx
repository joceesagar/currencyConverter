
import React, { useEffect } from 'react'

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import CustomDropDown from './customDropDown';
import { Input } from "@/components/ui/input"






function Body() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set a timeout to change the state after 3 ms
    const timer = setTimeout(() => {
      setIsReady(true); // Set isReady to true after 3 ms
    }, 4500); // 3 ms delay

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className='h-full w-full flex justify-center items-center absolute inset-0 '>
      {isReady &&
        <motion.div
          initial={{ opacity: 0, y: -1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 3,
            ease: [0.68, -0.55, 0.27, 1.55],
          }}
          className='bg-custom-bg h-[530px] w-[785px] rounded-3xl backdrop-blur-md shadow-lg flex flex-col justify-center items-center gap-5 border-2 divide-solid border-white'>
          <div className='h2 converter'>CURRENCY CONVERTER</div>
          <div className='w-auto h-auto flex flex-col gap-10'>
            <div className='flex gap-40'>
              <CustomDropDown/>
              <CustomDropDown/>
            </div>
            <div >
              <div><p className='p1 ml-8'>AMOUNT</p></div>
              <Input placeholder='Eg:2500'/>
            </div>
          </div>
          <div className='bg-slate-800 w-[403px] h-[40px] mt-3'>are </div>
        </motion.div>
      }

    </section>
  )
}

export default Body
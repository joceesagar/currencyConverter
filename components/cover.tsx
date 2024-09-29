'use client'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'


const Cover: React.FC = () => {
  const [cover, setCover] = useState(true)

  return (
    <section className='h-full w-full flex justify-center items-center relative'>
      <AnimatePresence>
        {cover && (
          <>
            {/* Blurred background */}
            <motion.div
              initial={{ opacity: 0, y: -1000 }}  // Initial state
              animate={{ opacity: 1, y: 0 }}      // Enter animation
              exit={{ opacity: 0, y: 1000 }}      // Exit animation
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className='absolute inset-0 bg-gradient-to-r from-teal-200/50 to-teal-500/50 backdrop-blur-lg'
            />

            {/* Text animation */}
            <motion.div
              initial={{ opacity: 0, x: -1000 }}  // From: hidden and shifted
              animate={{ opacity: 1, x: 0 }}      // To: visible and centered
              exit={{ opacity: 0, x: 1000 }}      // Exit animation
              transition={{
                duration: 3,                      // 3 seconds duration
                ease: [0.68, -0.55, 0.27, 1.55],  // Bouncy easing
              }}
              className='z-20 text-center text-white'
              onAnimationComplete={() => setCover(false)}  // Set state after animation
            >
              {/* Responsive text */}
              <p className='p ml-[55px] md:text-5xl lg:text-6xl font-bold'>WELCOME</p>
              <p className='p ml-[55px] md:text-5xl lg:text-6xl'>TO</p>
              <p className='p ml-[55px] md:text-5xl lg:text-6xl'>CURRENCY CONVERTER</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Cover

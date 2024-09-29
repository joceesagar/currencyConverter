'use client'
import React, { useEffect, useState } from 'react'
import Cover from './cover'
import { motion } from 'framer-motion'
import Body from './body'

const Hero: React.FC = () => {

  return (
    <section className='absolute h-[100vh] w-[100vw] bg-hero bg-cover bg-no-repeat'>
    <Cover />
    <Body/>
    </section>
  )
}

export default Hero

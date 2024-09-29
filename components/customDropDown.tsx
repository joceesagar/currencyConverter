import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from '@radix-ui/react-icons'
import Image from 'next/image';

interface CustomDropDownProps {
  label: string;
}


function CustomDropDown({ label }: CustomDropDownProps) {
  
  return (
    <div className='flex flex-col gap-1'>
      <div>
        <p className='p1 ml-[55px]'>FROM</p>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className='dropdown flex gap-1 group'>
            <div className='h-auto w-auto h2 dropdown1'>
            <img src="https://flagsapi.com/US/shiny/64.png"></img>
              {label}
              </div>
            <div className='h-auto w-auto  mt-1  group-hover:translate-x-1 dropdown-hover:translate-x-1 transition-all'><ChevronDownIcon width={30} height={30} /></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default CustomDropDown
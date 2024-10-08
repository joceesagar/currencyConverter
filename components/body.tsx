
import React, { useEffect } from 'react'

import { useState } from "react";
import { motion} from "framer-motion";
import CustomDropDown from './customDropDown';
import { Input } from "@/components/ui/input"
import { Button } from './ui/button';
import { ArrowRightIcon} from '@radix-ui/react-icons';






function Body() {
  const [isReady, setIsReady] = useState(false);
  const [fromCurrency, setFromCurrency] = useState<string>("INR")
  const [fromCurrencyRate, setFromCurrencyRate] = useState<number>(92.728091)
  const [toCurrency, setToCurrency] = useState<string>("USD")
  const [toCurrencyRate, setToCurrencyRate] = useState<number>(1.10449)
  const [amount, setAmount] = useState<string | number>("")
  const [result, setResult] = useState<number | null>(null)


  useEffect(() => {
    // Set a timeout to change the state after 3 ms
    const timer = setTimeout(() => {
      setIsReady(true); // Set isReady to true after 3 ms
    }, 3500); // 3 ms delay

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  console.log("From:", fromCurrency)
  console.log("FromRate:", fromCurrencyRate)
  console.log("To:", toCurrency)
  console.log("toRate:", toCurrencyRate)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value ? Number(value) : "")
  }

  const handleConvert = () => {
    const numericAmount = typeof amount === 'string' ? Number(amount) : amount;
    if (!isNaN(numericAmount) && !isNaN(fromCurrencyRate) && !isNaN(toCurrencyRate)) {
      const finalResult = (toCurrencyRate / fromCurrencyRate) * numericAmount;
      const fixedResult = parseFloat(finalResult.toFixed(4))
      setResult(fixedResult); // Store the result
    } else {
      console.error("Invalid input values");
    }
  }

  return (
    <section className='h-full w-full flex justify-center items-center absolute inset-0'>
      {isReady &&
        <motion.div
          initial={{ opacity: 0, y: -1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 3,
            ease: [0.68, -0.55, 0.27, 1.55],
          }}
          className='bg-custom-bg h-auto p-5 w-[785px] rounded-3xl backdrop-blur-md shadow-lg flex flex-col justify-center items-center gap-5 border-2 divide-solid border-white'>
          <div className='h2 converter'>CURRENCY CONVERTER</div>
          <div className='w-auto h-auto flex flex-col gap-10'>
            <div className='flex gap-40'>
              <CustomDropDown
                label='FROM'
                selectedCurrency={fromCurrency}
                onCurrencySelect={
                  (currency, rate) => {
                    setFromCurrency(currency)
                    setFromCurrencyRate(rate)
                  }
                }
              />
              <CustomDropDown
                label='TO'
                selectedCurrency={toCurrency}
                onCurrencySelect={
                  (currency, rate) => {
                    setToCurrency(currency)
                    setToCurrencyRate(rate)
                  }
                }
              />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div><p className='p1'>AMOUNT</p></div>
              <Input placeholder='Eg:2500'
                value={amount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='w-full h-auto mt-3 flex justify-center items-center'>
            <Button variant="outline"
            onClick={handleConvert}
            className='group flex gap-2'
            >
              <div>Convert</div>
              <div className="h-auto w-auto group-hover:translate-x-1 group-hover:translate-y-[-1px] group-hover:rotate-[-45deg]  dropdown-hover:translate-x-1 transition-all">
                <ArrowRightIcon width={30} height={30} />
              </div>
            </Button>
          </div>
          {result && <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.68, -0.55, 0.27, 1.55],
          }}
          >
            <p className='p2'>{amount}{fromCurrency} = {result}{toCurrency}</p>
          </motion.div>}
        </motion.div>
      }

    </section>
  )
}

export default Body
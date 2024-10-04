import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios';
import Image from 'next/image';

interface CustomDropDownProps {
  label: string;
  selectedCurrency: string
  onCurrencySelect: (currency:string, rate:number) => void
}

// Define interfaces for the API response
interface CurrencyRates {
  [key: string]: number; // Example: "USD": 1.23396, "EUR": 1, "GBP": 0.882047
}

interface ExchangeRatesApiResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: CurrencyRates;
}

const CustomDropDown = ({ label, selectedCurrency, onCurrencySelect }: CustomDropDownProps) => {
  const [data, setData] = useState<ExchangeRatesApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get<ExchangeRatesApiResponse>(
          'https://api.exchangeratesapi.io/v1/latest',
          {
            params: {
              access_key: process.env.NEXT_PUBLIC_CURRENCY_API_KEY, // Use the API key from .env.local
            },
          }
        );
        setData(response.data); // Set the rates to the state directly
      }
      catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchCurrencyData();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <p className="p1 ml-[55px]">{label}</p>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="dropdown flex gap-2 group mt-2">
            <div>
              <Image src={`https://flagsapi.com/${selectedCurrency.slice(0, 2)}/shiny/64.png`}
                alt={`${selectedCurrency}flag`}
                width={60}
                height={60}
                />

            </div>
            <div className='flex mt-3'>
              <div className="h-auto w-auto h2 dropdown1 flex gap-2">
                {selectedCurrency}
              </div>
              <div className="h-auto w-auto mt-1 group-hover:translate-x-1 dropdown-hover:translate-x-1 transition-all">
                <ChevronDownIcon width={30} height={30} />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <ScrollArea className="h-[200px]">
              {/* Handle loading and error states */}
              {loading && <DropdownMenuItem>Loading...</DropdownMenuItem>}
              {error && <DropdownMenuItem>{error}</DropdownMenuItem>}

              {/* Map through currency rates if data exists */}
              {data &&
                Object.entries(data.rates).map(([currency, rate]) => (
                  <DropdownMenuItem key={currency}>
                    {currency} <Image src={`https://flagsapi.com/${currency.slice(0, 2)}/shiny/64.png`}
                      alt={`${currency}flag`}
                      onClick={() => onCurrencySelect(currency,rate)}
                      width={60}
                      height={60}
                    />
                  </DropdownMenuItem>
                ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CustomDropDown;

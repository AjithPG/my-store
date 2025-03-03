import { useState } from "react";
import { formatPrice } from "../utils";

interface FormatPriceProps {
    label:string;
    name:string;
    size:string;
    price:number;
}

const FormatRange = ({label,name,size,price}:FormatPriceProps) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState<number>( price ||maxPrice);
  return (
    <div className="form-control">
        <label htmlFor={name} className="label">
            <span className="label-text capitalize">{label}</span>
            <span>{formatPrice(selectedPrice)}</span>
        </label>
        <input type="range" 
        name={name} 
        min={0} 
        max={maxPrice} 
        value={selectedPrice}
        className={`range range-primary ${size}`} 
        step={step}
        onChange={(e)=>setSelectedPrice(Number(e.target.value))}
        />
        <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'>0</span>
        <span className='font-bold text-md'>Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  )
}

export default FormatRange
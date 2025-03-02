import { useState } from "react";
import { formatPrice } from "../utils";

interface FormatPriceProps {
    label:string;
    name:string;
    size:string;
}

const FormatRange = ({label,name,size}:FormatPriceProps) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState<number>(maxPrice);
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
    </div>
  )
}

export default FormatRange
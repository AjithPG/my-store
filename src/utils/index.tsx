import axios from 'axios';

const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});



export const formatPrice = (price:number):string => {
    const dollarsAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
    return dollarsAmount;
  };

  export const generateAmountOptions = (number:number) => {
    return Array.from({ length: number }, (_, index) => {
      const amount = index + 1;
  
      return (
        <option key={amount} value={amount}>
          {amount}
        </option>
      );
    });
  };
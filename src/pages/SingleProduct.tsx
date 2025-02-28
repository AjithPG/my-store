import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice } from "../utils";
import { useState } from "react";

interface Params {
  id: string;
}

export const loader = async ({ params }: { params: Params }) => {
  const response = await customFetch(`products/${params.id}`);
  const product = response.data.data;
  return { product };
};
const SingleProduct = () => {
  const { product } = useLoaderData();
  console.log(product);
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [amount, setAmount] = useState(1);
  const [productColor, setProductColor] = useState(colors[0]);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="grid lg:grid-cols-2 gap-y-8 lg:gap-x-16 mt-6">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{dollarsAmount}</p>

          <p className="mt-6 leading-8">{description}</p>
          <div className='mt-2'>
              {colors.map((color:any) => {
                return (
                  <button
                    key={color}
                    type='button'
                    className={`badge border-2   w-6 h-6 rounded-full mr-2  ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => console.log("add to bag")}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

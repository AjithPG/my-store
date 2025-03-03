import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormatRange from "./FormatRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, company, category, shipping, order, price } = params;
  console.log('search',search)
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center" method="get">
      <FormInput
        type="search"
        name="search"
        label="Search Products"
        defaultValue={search}
        size="input-sm"
      />
      <FormSelect
        label="Select Category"
        name="category"
        size="select-sm"
        defaultValue={category}
        list={meta.categories}
      />
      <FormSelect
        label="Select Company"
        name="company"
        size="select-sm"
        defaultValue={company}
        list={meta.companies}
      />
      <FormSelect
        label="Sort By"
        name="sort"
        size="select-sm"
        defaultValue={order}
        list={["a-z", "z-a", "high", "low"]}
      />
      <FormatRange label="select price" name="price" size="range-sm" price={price} />
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      <button type="submit" className="btn btn-sm btn-primary">
        Search
      </button>
      <Link to="/products" className="btn btn-sm btn-accent">
        Reset
      </Link>
    </Form>
  );
};

export default Filters;

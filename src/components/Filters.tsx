import { Form,Link, useLoaderData } from "react-router-dom"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import FormatRange from "./FormatRange";

const Filters = () => {
  const {meta} = useLoaderData();
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput type="search" name="Search" label="Search Products" size="input-sm"  />
      <FormSelect label="Select Category" name="Category" size="select-sm" list={meta.categories}/>
      <FormSelect label="Select Category" name="Category" size="select-sm" list={meta.companies}/>
      <FormSelect label="Sort By" name="sort" size="select-sm" list={['a-z','z-a','high','low']}/>
      <FormatRange label="select price" name="price" size="range-sm"/>
      <button type="submit" className="btn btn-sm btn-primary">Search</button>
      <Link to="/products" className="btn btn-sm btn-accent">Reset</Link>
    </Form>
  )
}

export default Filters
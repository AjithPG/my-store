
type FormInputprops = {
    label:string;
    name:string;
    type:string;
    defaultValue?:string;
    size:string;
}

const FormInput = ({label,name,type,defaultValue,size}:FormInputprops) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input type={type} name={name} className={`input input-bordered ${size}`} defaultValue={defaultValue}/>
      {/* <p className="fieldset-label">Optional</p> */}
    </fieldset>
  );
};

export default FormInput;

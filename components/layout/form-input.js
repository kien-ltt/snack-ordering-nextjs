const FormInput = (props) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className='block font-bold mb-3 text-neutral-700'
      >
        {props.label}
      </label>
      <input
        className='block w-full rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 py-2 px-4'
        type={props.type}
        name={props.name}
      />
    </div>
  );
};

export default FormInput;

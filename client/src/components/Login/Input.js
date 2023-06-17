export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>

      <input
        onChange={handleChange}
        className="rounded-md my-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        placeholder={placeholder}
      />
    </div>
  );
}

/**
 * VinInput Component
 * Reusable VIN number input field
 */
const VinInput = ({ value, onChange, error, setError }) => {
  const handleChange = (e) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
    if (setError) setError('');
  };

  return (
    <div>
      <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Vehicle Identification Number (VIN) <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter VIN"
        autoComplete="off"
        className="w-full px-4 py-3 text-lg placeholder-gray-400 transition-all border-2 border-gray-300 rounded-lg dark:border-mahindra-red/30 focus:ring-2 focus:ring-mahindra-red focus:border-mahindra-red dark:bg-mahindra-gray-dark dark:text-white dark:placeholder-gray-500"
      />
    </div>
  );
};

export default VinInput;

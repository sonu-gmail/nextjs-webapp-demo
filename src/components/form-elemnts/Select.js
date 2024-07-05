const Select = ({name, errors, touched, values, handleChange}) => {
    return (
        <div>
            <label className="text-white dark:text-gray-200">Select Country</label>
            <select value={values} name={name} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange}>
                <option value="">Please Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
            </select>
            {errors && touched && <span className="text-red-700">{errors}</span>}
        </div>
    )
}

export default Select
const DateElement = ({label, type, name, errors, touched, values, handleChange}) => {
    return (
        <div>
            <label className="text-white dark:text-gray-200" >{label}</label>
            <input id="date" type={type} name={name} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange} value={values}/>
            {errors && touched && <span className="text-[red]">{errors}</span>}
        </div>
    )
}

export default DateElement;
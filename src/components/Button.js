const Button = ({label, type}) => {
    return (
        <>
            <button type={type} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">{label}</button>
        </>
    )
}

export default Button;
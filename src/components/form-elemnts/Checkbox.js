const Checkbox = ({type, name, value, values, handleChange}) => {
    console.log(values);
    return (
        <div className="m-4">
            <input type={type} name={name} value={value} onChange={handleChange} checked={values.includes(value)}/> {value}
        </div>
    )
}

export default Checkbox;
const Radio = ({type, name, value, values, handleChange}) => {
    return (
        <div className="m-4">
            <input type={type} name={name} value={value} onChange={handleChange} checked={values === value}/> {value}
        </div>
    )
}

export default Radio;
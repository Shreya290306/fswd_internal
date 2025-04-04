import './input-value.css'



function InputValue({ handleChange, value}) {
    return (
        <div className="qr-container">
            <input
                className='input'
                type="text"
                placeholder='Enter URL or Name...'
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}

export default InputValue;
import "./button.css"


function Button({textBtn, showQrCode}) {
    return (
        <>
        <button type="button" className="btn" onClick={showQrCode} >{textBtn}</button>
        </>
    )
}

export default Button
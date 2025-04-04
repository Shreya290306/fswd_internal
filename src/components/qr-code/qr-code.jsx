import "./qr-code.css";
import {QRCodeSVG} from 'qrcode.react';


function QrCode({qrText}) {
    return (
        <>
            <div className="qr">
                <QRCodeSVG value={qrText} />
            </div>
            
        </>
    )
}

export default QrCode;
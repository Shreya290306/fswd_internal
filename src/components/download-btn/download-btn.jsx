import "./download-btn.css"


function DownloadBtn({textDown, downloadQrCode}) {
    return (
        <>
            <button className="down-btn" type="button"onClick={downloadQrCode} >{textDown}</button>
        </>
    )
};

export default DownloadBtn;
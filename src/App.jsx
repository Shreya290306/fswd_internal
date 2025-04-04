import { useEffect,useState } from 'react'
import { QRCodeCanvas } from "qrcode.react"; 
import { useRef } from "react";
import './App.css'
import InputValue from './components/input-value/input-value'
import Title from './components/title/title'
import Button from './components/button/button'
import QrCode from './components/qr-code/qr-code'
import Warn from './components/warn/warn'
import DeleteBtn from './components/delete-btn/delete-btn'
import DownloadBtn from './components/download-btn/download-btn'
import QrHistory from "./components/qr-history/qr-history";

const title = "QR-code generation"
const textBtn = "Click"
const textDel = "Delete"
const textDown = "Download"

function App() {
 
  const [qrText, setQrText] = useState('');
  const [isVisibleQr, setIsVisibleQr] = useState(false);
  const [isWarnVisible, setIsWarnVisible] = useState(false); 
  const [isDeleteVisible, setIsDeleteVisible] = useState(false) 
  const [isDownloadVisible, setIsDownloadVisible] = useState(false) 
  const [qrHistory, setQrHistory] = useState([]); // ✅ New state to store QR Code history

  const qrRef = useRef(null);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("qrHistory")) || [];
    setQrHistory(storedHistory);
    localStorage.removeItem("qrHistory"); 
  }, []);
  
  const handleChange = (event) => {
    setIsWarnVisible(false);
    const inputValue = event.target.value;
    if (inputValue === "") {
   
      console.log("null");
      
      return
    } else {
      setQrText(inputValue);
    }
  }

  const showQrCode = () => {
    if (qrText === "") {
      setIsVisibleQr(false);
      showWarn();
      console.log("qr-code not generated");
      
    } else {
      setIsVisibleQr(true);
      showDeleteAndDownload();
      
    
      setQrHistory((prevHistory) => {
        const updatedHistory = [qrText, ...prevHistory];
        return updatedHistory.slice(0, 5); // Keep last 5 QR codes
      });
    }
  
  }
  const showWarn = () => {
    setIsWarnVisible(true);
  }

  const showDeleteAndDownload = () => {
    setIsDeleteVisible(true);
    setIsDownloadVisible(true);
  }

  const deleteBlock = () => {
    setIsDeleteVisible(false);
    setIsDownloadVisible(false);
    setIsVisibleQr(false);
    
    setQrHistory((prevHistory) => {
      const updatedHistory = prevHistory.slice(1); // Remove first element
      localStorage.setItem("qrHistory", JSON.stringify(updatedHistory)); // Sync with storage
      return updatedHistory;
    });
  
    setQrText(""); 
  };

  const downloadQrCode = () => {
    const canvas = qrRef.current.querySelector("canvas"); 
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");у
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png"; 
    document.body.appendChild(downloadLink); 
    downloadLink.click(); 
    document.body.removeChild(downloadLink); 
  };

  
  
  return (
    <>
      <Title title={title} />
      {isWarnVisible ? <Warn /> : null}
      <div className='block-inp'>
        { }
        <InputValue handleChange={handleChange} value={qrText} />
        <Button textBtn={textBtn } showQrCode={showQrCode}  />
      </div>
        {isVisibleQr && (
        <div className='qr-code' ref={qrRef}>
          <QRCodeCanvas bgColor="#ffffff"  value={qrText} size={150}  />
        </div>
      )}
     
      <div className='btn-row'>
        {isDeleteVisible ? <DeleteBtn textDel={textDel} deleteBlock={deleteBlock} /> : null}
        {isDownloadVisible ? <DownloadBtn textDown={textDown} downloadQrCode={downloadQrCode} /> : null }
      </div>

       {/* Add QR History Component Here */}
    {qrHistory.length > 0 && <QrHistory history={qrHistory} />}

      {/* ✅ QR Code History Section
      <div className="history">
        <h3>QR Code History</h3>
        <ul>
          {qrHistory.map((text, index) => (
            <li key={index}>
              <QRCodeCanvas value={text} size={80} />
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  )
}

export default App

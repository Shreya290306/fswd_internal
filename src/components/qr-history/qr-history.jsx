import { QRCodeCanvas } from "qrcode.react";
import "./qr-history.css";

function QrHistory({ history }) {
  return (
    <div className="qr-history">
      <h3>QR Code History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <QRCodeCanvas value={item} size={80} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QrHistory;

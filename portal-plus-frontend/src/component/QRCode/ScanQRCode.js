import { QrScanner } from "@yudiel/react-qr-scanner";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { scanQRCode } from "../../store";
function ScanQRCode() {
  const [showCamera, setShowCamera] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setShowCamera(true);
  };
  const handleScannedResult = (result) => {
    const date = new Date(result.timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // console.log(formattedDate);
    const text = JSON.parse(result.text);
    dispatch(scanQRCode({ ...text, day, month, year }));
    setShowCamera(false);
  };
  return (
    <div>
      <Button onClick={handleClick} color="success">
        افتح الكاميرا
      </Button>
      {showCamera ? (
        <QrScanner
          onResult={(result) => handleScannedResult(result)}
          onError={(error) => console.log(error?.message)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default ScanQRCode;

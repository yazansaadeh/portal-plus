import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { scanQRCode } from "../../store";
import SideBar from "../SideBar";
import { IoIosNotifications } from "react-icons/io";

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
    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // console.log(formattedDate);
    const text = JSON.parse(result.text);
    dispatch(scanQRCode({ ...text, day, month, year }));
    setShowCamera(false);
  };
  return (
    <div className="h-screen flex items-start justify-items-start ">
      <SideBar className='hidden sm:flex'/>
      {/* container */}
      <div className="flex justify-center flex-col w-screen mr-12 h-8/12 mt-2 md:mt-18">
        <h1 className="font-medium text-lg sm:text-3xl text-[#334e7d]">
          بوابة الطالب الألكترونية
        </h1>
        <div className="bg-[#334e7d] text-white w-11/12 h-44 sm:h-44 rounded-md mt-4 text-center sm:text-right flex justify-center flex-col">
          <div className="flex items-center p-2">
            <IoIosNotifications className="text-md sm:text-3xl ml-2" />
            <p className="text-md sm:text-lg font-medium">
              {" "}
              ملاحظات هامة جداً :{" "}
            </p>
          </div>
          <div className="text-md sm:text-xl px-4 font-medium">
            للطلاب القدامى فقط ستبدأ غرامة التأخير من تاريخ 03-03-2023 للعام
            الدراسي 2022 الفصل الدراسي الثاني
          </div>
        </div>
        <div className="w-full flex items-center flex-col justify-center">
        <button onClick={handleClick} className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in m-4">
          افتح الكاميرا
        </button>
        {showCamera ? (
          <QrScanner
            onResult={(result) => handleScannedResult(result)}
            onError={(error) => console.log(error?.message)}
          />
        ) : (
          ""
        )}
      </div>
      </div>
    </div>
  );
}
export default ScanQRCode;

import SideBar from "../SideBar";
import { useSelector, useDispatch } from "react-redux";
import { getTrainingFile } from "../../store";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Button } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { checkTrainingFile } from "../../store";
import { removeFileInDoctorPage } from "../../store";
import DeclineTextDialog from "./DeclineTextDialog";
import { IoIosNotifications } from "react-icons/io";

function DoctorPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { trainingFile, checkStatus } = useSelector((state) => {
    return state.training;
  });
  useEffect(() => {
    dispatch(getTrainingFile());
  }, [dispatch, checkStatus]);

  const handleOpenFile = (file) => {
    const fileURL = `/api/getFile/${file.fileName}`;
    window.open(fileURL, "_blank");
  };

  const handleApprovalClick = (fileName) => {
    dispatch(checkTrainingFile({ checkType: "true", fileName }));
  };
  const handleDeclineClick = (fileName) => {
    setIsDialogOpen(true);
  };
  const handleDelete = (fileName) => {
    dispatch(removeFileInDoctorPage({ fileName }));
  };
  const handleConfirm = () => {
    setIsDialogOpen(false);
  };

  let content;
  if (trainingFile.length > 0) {
    content = trainingFile.map((file) => {
      if (file.fileStatus === "null") {
        return (
          <div
            key={file.studentId}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer flex "
          >
            <Button
              onClick={() => handleDeclineClick(file.fileName)}
              color="error"
            >
              <TiDelete className="text-2xl" />
            </Button>
            <Button
              onClick={() => handleApprovalClick(file.fileName)}
              color="success"
            >
              <FaCheck className="text-2xl" />
            </Button>
            <div onClick={() => handleOpenFile(file)} className=" pl-6 py-4">
              <div className="font-bold text-xl mb-2">{file.fileName}</div>
            </div>
            <DeclineTextDialog
              open={isDialogOpen}
              onConfirm={handleConfirm}
              fileName={file.fileName}
            />
          </div>
        );
      } else if (file.fileStatus === "true") {
        return (
          <div
            key={file.studentId}
            className={`relative max-w-xs rounded overflow-hidden shadow-lg m-4  ${
              file.showInDoctorPage ? "flex" : "hidden"
            }`}
          >
            <div className="flex items-center justify-between text-center h-24 rounded-md text-[#334e7d]">
              <button
                onClick={() => handleDelete(file.fileName)}
                className="absolute top-0 right-0 p-2 text-black rounded-full mb-12"
              >
                <TiDelete className="text-2xl ml-12" />
              </button>
              <div className=" pl-6 py-4">
                <div className="font-bold text-xl mb-2">
                  لقد تمت الموافقة على ملف التدريب
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={file.studentId}
            className={`relative max-w-xs rounded overflow-hidden shadow-lg m-4  ${
              file.showInDoctorPage ? "flex" : "hidden"
            }`}
          >
            <div className="flex items-center justify-between text-center h-24 rounded-md text-[#334e7d]">
              <button
                onClick={() => handleDelete(file.fileName)}
                className="absolute top-0 right-0 p-2 text-black rounded-full mb-12"
              >
                <TiDelete className="text-2xl ml-12" />
              </button>
              <div className="pl-6 py-4">
                <div className="font-bold text-xl mb-2">
                  لقد تم رفض ملف التدريب
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  } else {
    content = <div>لا يوجد حاليا اي ملفات تدريب</div>;
  }
  return (
    <div className="h-screen flex items-center justify-center ">
      <SideBar className="hidden sm:flex" />
      {/* container */}
      <div className="flex justify-center flex-col w-screen mr-12 h-8/12 mb-80 md:mt-18">
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
        <div className="mt-12 flex items-center justify-center ">{content}</div>
      </div>
    </div>
  );
}
export default DoctorPage;

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
            <button
              onClick={() => handleDelete(file.fileName)}
              className="absolute top-0 right-0 p-2 text-black rounded-full"
            >
              <TiDelete className="text-2xl" />
            </button>
            <div className=" pl-6 py-4">
              <div className="font-bold text-xl mb-2">
                لقد تمت الموافقة على ملف التدريب
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
            <button
              onClick={() => handleDelete(file.fileName)}
              className="absolute top-0 right-0 p-2 text-black rounded-full"
            >
              <TiDelete className="text-2xl" />
            </button>
            <div className="pl-6 py-4">
              <div className="font-bold text-xl mb-2">
                لقد تم رفض ملف التدريب
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
    <div className="flex justify-between items-start text-center ">
      <SideBar />

      <div style={{position:'absolute',top:'50%',left:'40%',transform:'translate(-50%,-50%)'}}>
        {content}
      </div>
    </div>
  );
}
export default DoctorPage;

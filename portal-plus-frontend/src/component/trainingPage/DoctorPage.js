import SideBar from "../SideBar";
import { useSelector, useDispatch } from "react-redux";
import { getTrainingFile } from "../../store";
import { useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { Button } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { checkTrainingFile } from "../../store";

function DoctorPage() {
  const dispatch = useDispatch();
  const { trainingFile } = useSelector((state) => {
    return state.training;
  });
  useEffect(() => {
    dispatch(getTrainingFile());
  }, [dispatch]);

  const handleOpenFile = (file) => {
    const fileURL = `/api/getFile/${file.fileName}`;
    window.open(fileURL, "_blank");
  };

  const handleApprovalClick = () => {
    dispatch(checkTrainingFile({ checkType: "true" }));
  };
  const handleDeclineClick = () => {
    dispatch(checkTrainingFile({ checkType: "false" }));
  };

  let content;
  if (trainingFile.length > 0) {
    content = trainingFile.map((file) => {
      if (file.fileStatus === null) {
        return (
          <div
            key={file.studentId}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer flex"
          >
            <Button onClick={handleDeclineClick} color="error">
              <TiDelete className="text-2xl" />
            </Button>
            <Button onClick={handleApprovalClick} color="success">
              <FaCheck className="text-2xl" />
            </Button>
            <div onClick={() => handleOpenFile(file)} className=" pl-6 py-4">
              <div className="font-bold text-xl mb-2">{file.fileName}</div>
            </div>
          </div>
        );
      } else if (file.fileStatus === "true") {
        return (
          <div
            key={file.studentId}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex"
          >
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
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 flex"
          >
            <div className=" pl-6 py-4">
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
    <div className="flex justify-between items-start text-center">
      <SideBar />
      {content}
    </div>
  );
}
export default DoctorPage;

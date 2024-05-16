import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar";
import {
  storeTrainingFile,
  deleteTrainingFile,
  getTrainingFileForOneStudent,
} from "../../store";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

function StudentPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const { userFile, data, error } = useSelector((state) => state.training);

  useEffect(() => {
    dispatch(getTrainingFileForOneStudent());
  }, [dispatch, data]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      dispatch(storeTrainingFile({ trainingFile: selectedFile }));
    } else {
      console.log("No file selected");
    }
  };

  let extensionFile;
  if (userFile) {
    extensionFile = userFile.fileName.split(".")[1];
  }

  const handleOpenFile = () => {
    const fileURL = `/api/getFile/${userFile.studentId}.${extensionFile}`;
    window.open(fileURL, "_blank");
  };

  const handleDeleteFile = () => {
    dispatch(
      deleteTrainingFile({
        studentId: userFile.studentId,
        fileName: `${userFile.studentId}.${extensionFile}`,
      })
    );
    setSelectedFile(null);
  };

  return (
    <div className="flex justify-center sm:justify-between items-start text-center">
      <SideBar />
      <div className="flex items-center justify-center h-screen flex-col w-full">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="cursor-pointer" htmlFor="trainingFile">
              إختر ملف:
            </label>
            <input
              id="trainingFile"
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </div>
          {selectedFile ? <p>{selectedFile.name}</p> : ""}
          <div>
            <button
              className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in m-4"
              type="submit"
            >
              إرسال الملف
            </button>
          </div>
          {error ? (
            <p className=" text-red-700">لا يمكنك ارسال اكثر من ملف واحد</p>
          ) : (
            ""
          )}
        </form>
      </div>
      {userFile ? (
        <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer flex">
          <Button color="error" onClick={handleDeleteFile}>
            <MdDelete className="text-2xl" />
          </Button>
          <div onClick={handleOpenFile} className="pl-6 py-4">
            <div className="font-bold text-xl mb-2">{userFile.fileName}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default StudentPage;

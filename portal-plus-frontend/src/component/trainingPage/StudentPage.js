import { useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "../SideBar";
import { storeTrainingFile, deleteTrainingFile } from "../../store";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

function StudentPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFile, setShowFile] = useState(false);
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Selected File:", selectedFile.name);
      dispatch(storeTrainingFile({ trainingFile: selectedFile }));
      setShowFile(true);
    } else {
      console.log("No file selected");
    }
  };
  const handleOpenFile = () => {
    const fileURL = `/api/getFile/${selectedFile.name}`;
    window.open(fileURL, "_blank");
  };
  const handleDeleteFile = () => {
    setShowFile(false);
    dispatch(deleteTrainingFile({ trainingFile: selectedFile }));
    setSelectedFile(null);
  };

  return (
    <div className="flex justify-center sm:justify-between items-start text-center">
      <SideBar />
      <div className="flex items-center justify-center h-screen flex-col w-full" >
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
            <button className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in m-4" type="submit">إرسال الملف</button>
          </div>
        </form>
        {showFile ? (
          <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer flex">
            <Button color="error" onClick={handleDeleteFile}>
              <MdDelete className="text-2xl" />
            </Button>
            <div onClick={handleOpenFile} className=" pl-6 py-4">
              <div className="font-bold text-xl mb-2">{selectedFile.name}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default StudentPage;

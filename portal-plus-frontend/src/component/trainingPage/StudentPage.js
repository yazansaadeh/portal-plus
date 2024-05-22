import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar";
import { IoIosNotifications } from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";
import {
  storeTrainingFile,
  deleteTrainingFile,
  getTrainingFileForOneStudent,
} from "../../store";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function StudentPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [declineText, setDeclineText] = useState("");
  const dispatch = useDispatch();
  const { userFile, data, error } = useSelector((state) => state.training);

  useEffect(() => {
    dispatch(getTrainingFileForOneStudent());
  }, [dispatch, data]);

  const handleFileChange = (event) => {
    console.log(event.target.files);
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
    setDeclineText("");
  };
  const handleShowDeclineText = (text) => {
    setDeclineText(text);
  };
  console.log("rrr");

  let content;
  if (userFile && userFile.fileStatus === "null") {
    content = (
      <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 cursor-pointer flex items-center justify-center w-52 rounded-md">
        <Button color="error" onClick={handleDeleteFile}>
          <MdDelete className="text-2xl text-[#354d7a]" />
        </Button>
        <div onClick={handleOpenFile} className="pl-6 py-4">
          <div className="font-bold text-xl mb-2 text-[#354d7a]">
            {userFile.fileName}
          </div>
        </div>
      </div>
    );
  } else if (userFile && userFile.fileStatus === "true") {
    content = (
      <div className="relative max-w-xs rounded overflow-hidden shadow-lg m-4 ">
        <div className=" pl-6 py-4">
          <div className="font-bold text-xl mb-2 text-[#354d7a] rounded-md">
            لقد تمت الموافقة على ملف التدريب
          </div>
        </div>
      </div>
    );
  } else if (userFile && userFile.fileStatus === "false") {
    content = (
      <div className="relative max-w-xs rounded overflow-hidden shadow-lg m-4">
        <button
          onClick={handleDeleteFile}
          className="absolute top-0 right-0 p-2 text-black rounded-full"
        >
          <TiDelete className="text-2xl" />
        </button>
        <div className=" pl-6 py-4">
          <div className="font-bold text-xl mb-2">لقد تم رفض ملف التدريب</div>
        </div>
        <button onClick={() => handleShowDeclineText(userFile.declineText)}>
          السبب
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center ">
      <SideBar className="hidden sm:flex" />
      {/* container */}
      <div className="flex justify-center flex-col w-screen mr-12 h-8/12 mt-72 md:mt-18">
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
        <div className="flex items-center justify-items-center h-screen flex-col mt-12">
          <div>
            {content}
            {declineText}
          </div>
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
      </div>
    </div>
  );
}

export default StudentPage;

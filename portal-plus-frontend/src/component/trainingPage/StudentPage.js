import { useState } from "react";
import SideBar from "../SideBar";
function StudentPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="flex justify-between items-start text-center">
      <SideBar />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="trainingFile">إختر ملف:</label>
          <input
            id="trainingFile"
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </div>
        {selectedFile ? <p>{selectedFile.name}</p> : ""}
        <div>
          <button type="submit">إرسال الملف</button>
        </div>
      </form>
    </div>
  );
}
export default StudentPage;

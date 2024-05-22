import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { getUserCourse, deleteCourse } from "../store";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import SideBar from "./SideBar";
import OfficeTimeDialog from "./OfficeTimeDialog";

function UserCourse() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const dispatch = useDispatch();
  const { userData, userAttendance } = useSelector((state) => {
    return state.course;
  });
  useEffect(() => {
    dispatch(getUserCourse());
  }, [dispatch]);

  const handleConfirm = () => {
    setIsDialogOpen(false);
  };
  const handleClick = (doctorName) => {
    setDoctorName(doctorName);
    setIsDialogOpen(true);
  };

  let showDeleteBtn = "";
  let content;

  if (userData.length > 0) {
    content = userData.map((row, index) => {
      const userCourseAttendance = userAttendance.filter((course) => {
        return course.courseId === row.course.courseId;
      });
      return (
        <div
          key={row.course.id}
          className="flex flex-row justify-between items-center gap-2 p-4 w-full "
          style={{ backgroundColor: index % 2 === 0 ? "white" : "#334e7d" }}
        >
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {" "}
            {row.course.courseId}
          </p>
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {row.course.courseName}
          </p>
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {row.course.time}
          </p>
          <p
            onClick={() => handleClick(row.course.doctorName)}
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5 cursor-pointer"
          >
            {row.course.doctorName}
          </p>
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {row.course.location}
          </p>
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {userCourseAttendance.length > 7
              ? "محروم"
              : userCourseAttendance.length}
          </p>
        </div>
      );
    });
  } else {
    content = <p>you are not registered in any course</p>;
  }

  return (
    <div className="h-screen flex  justify-center ">
      <SideBar className="hidden sm:flex" />
      <OfficeTimeDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        doctorName={doctorName}
      />
      {/* container */}
      <div className="flex flex-col w-screen mr-12 h-8/12">
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
        <div className="bg-[#334e7d] text-white w-11/12 rounded-md mt-4 text-center flex items-center justify-between gap-2 flex-col">
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full">
            <p className="px-4 py-2">{showDeleteBtn ? "حذف المادة" : ""}</p>
            <p className="w-1/5 text-sm md:text-lg">رقم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">اسم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">وقت المحاضرة</p>
            <p className="w-1/5 text-sm md:text-lg">اسم المدرس</p>
            <p className="w-1/5 text-sm md:text-lg">موقع المحاضرة</p>
            <p className="w-1/5 text-sm md:text-lg">عدد الغيابات </p>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}

export default UserCourse;

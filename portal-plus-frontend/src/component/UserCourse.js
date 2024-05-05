import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { getUserCourse, deleteCourse } from "../store";
import { useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SideBar from './SideBar'

function UserCourse() {
  const dispatch = useDispatch();
  const { userData, userAttendance } = useSelector((state) => {
    return state.course;
  });
  useEffect(() => {
    dispatch(getUserCourse());
  }, [dispatch]);

  const handleDeleteCourse = (id) => {
    dispatch(deleteCourse({ id }));
  };

  let showDeleteBtn = "";
  let content;

  if (userData.length > 0) {
    content = userData.map((row, index) => {
      if (window.location.pathname === "/courseRegister") {
        showDeleteBtn = (
          <Button
            key={row.course.id}
            color="error"
            variant="contained"
            onClick={() => {
              handleDeleteCourse(row.course._id);
            }}
          >
            حذف
          </Button>
        );
      }
      const userCourseAttendance = userAttendance.filter((course) => {
        return course.courseId === row.course.courseId;
      });
      return (
        <TableRow key={row.course.id}>
          <TableCell>{showDeleteBtn}</TableCell>
          <TableCell>{row.course.courseId}</TableCell>
          <TableCell>{row.course.courseName}</TableCell>
          <TableCell>{row.course.time}</TableCell>
          <TableCell>{row.course.location}</TableCell>
          <TableCell>{row.course.doctorName}</TableCell>
          <TableCell>
            {userCourseAttendance.length > 7
              ? "محروم"
              : userCourseAttendance.length}
          </TableCell>
        </TableRow>
      );
    });
  } else {
    content = <TableCell>you are not registered in any course</TableCell>;
  }

  return (
    // <div className='flex justify-between items-start text-center'>
    //   <div>
    //     <SideBar/>
    //   </div>
    //   <div className='flex items-center justify-center h-screen w-8/12 text-center'>
    //     <TableContainer component={Paper} className="w-8/12 flex items-center justify-center mx-4">
    //       <Table className="min-w-full">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell className="px-4 py-2">{showDeleteBtn ? "حذف المادة" : ""}</TableCell>
    //             <TableCell className="px-4 py-2">رقم المادة</TableCell>
    //             <TableCell className="px-4 py-2">اسم المادة</TableCell>
    //             <TableCell className="px-4 py-2">الوقت</TableCell>
    //             <TableCell className="px-4 py-2">المكان</TableCell>
    //             <TableCell className="px-4 py-2">إسم المدرس</TableCell>
    //             <TableCell className="px-4 py-2">عدد الغيابات</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>{content}</TableBody>
    //       </Table>
    //     </TableContainer>
    //   </div>
    // </div>
    <div className="h-screen flex  justify-center ">
      <SideBar className='hidden sm:flex'/>
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
            <p className="w-1/5 text-sm md:text-lg">رقم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">اسم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">وقت المحاضرة</p>
            <p className="w-1/5 text-sm md:text-lg">اسم المدرس</p>
            <p className="w-1/5 text-sm md:text-lg">موقع المحاضرة</p>
            <p className="w-1/5 text-sm md:text-lg">عدد الغيابات </p>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full bg-white text-[#334e7d] ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
            <p className="w-1/5">   0 </p>
          </div> 
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
            <p className="w-1/5">   0 </p>

          </div> 
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full bg-white text-[#334e7d] ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
            <p className="w-1/5">   0 </p>

          </div> 
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
            <p className="w-1/5">   0 </p>

          </div> 
        </div>
      </div>
    </div>
  );
}

export default UserCourse;
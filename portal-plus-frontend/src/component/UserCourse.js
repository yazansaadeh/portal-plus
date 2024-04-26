import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { getUserCourse, deleteCourse } from "../store";
import { useEffect } from "react";
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
    <div className='flex justify-between items-start text-center'>
      <div>
        <SideBar/>
      </div>
      <div className='flex items-center justify-center h-screen w-8/12 text-center'>
        <TableContainer component={Paper} className="w-8/12 flex items-center justify-center mx-4">
          <Table className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell className="px-4 py-2">{showDeleteBtn ? "حذف المادة" : ""}</TableCell>
                <TableCell className="px-4 py-2">رقم المادة</TableCell>
                <TableCell className="px-4 py-2">اسم المادة</TableCell>
                <TableCell className="px-4 py-2">الوقت</TableCell>
                <TableCell className="px-4 py-2">المكان</TableCell>
                <TableCell className="px-4 py-2">إسم المدرس</TableCell>
                <TableCell className="px-4 py-2">عدد الغيابات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default UserCourse;

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
      // let numberOfAbsence = 0;
      // if (userCourseAttendance.length > 7) {
      //   numberOfAbsence = "محروم";
      // }
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{showDeleteBtn ? "حذف المادة" : ""}</TableCell>
            <TableCell>رقم المادة</TableCell>
            <TableCell>اسم المادة</TableCell>
            <TableCell>الوقت</TableCell>
            <TableCell>المكان</TableCell>
            <TableCell>إسم المدرس</TableCell>
            <TableCell>عدد الغيابات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserCourse;

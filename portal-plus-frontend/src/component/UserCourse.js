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
  const { userData, error, isLoading } = useSelector((state) => {
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
    const renderedData = userData.map((row, index) => {
      return row.course[0];
    });
    content = renderedData.map((row) => {
      if (window.location.pathname === "/courseRegister") {
        showDeleteBtn = (
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleDeleteCourse(row._id);
            }}
          >
            حذف
          </Button>
        );
      }
      return (
        <TableRow key={row.id}>
          <TableCell>{showDeleteBtn}</TableCell>
          <TableCell>{row.courseId}</TableCell>
          <TableCell>{row.courseName}</TableCell>
          <TableCell>{row.time}</TableCell>
          <TableCell>{row.location}</TableCell>
          <TableCell>{row.doctorName}</TableCell>
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
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserCourse;

import { useDispatch, useSelector } from "react-redux";
import { getUserCourse } from "../store";
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
  const { data, error, isLoading } = useSelector((state) => {
    return state.course;
  });
  useEffect(() => {
    dispatch(getUserCourse());
  }, []);

  let content;

  if (data.length > 0) {
    const renderedData = data.map((row, index) => {
      return row.course[0];
    });
    content = renderedData.map((row) => {
      return (
        <TableRow key={row.id}>
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

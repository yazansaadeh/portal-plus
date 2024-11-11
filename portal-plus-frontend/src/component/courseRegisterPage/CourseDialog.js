import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../store";

const CourseDialog = ({ open, onClose, setValue }) => {
  const dispatch = useDispatch();
  const { error, allCourses, isLoading } = useSelector((state) => {
    return state.course;
  });
  //this is for getting all courses from the data base
  useEffect(() => {
    if (open) {
      dispatch(getCourses());
    }
  }, [dispatch, open]);

  const handleClick = (data) => {
    setValue("courseId", data.courseId);
    onClose();
  };

  let content;
  if (isLoading) {
    //the Skeleton show before the data came
    content = (
      <Skeleton
        variant="rectangular"
        width={200}
        height={100}
        style={{ borderRadius: "8px" }}
      />
    );
  } else if (error) {
    //this show when there is an error
    content = <div>There is an error</div>;
  } else if (allCourses.length > 0) {
    //this is the real data contain all the courses in array and loop the array
    content = allCourses.map((row, index) => {
      return (
        <TableRow
          key={index}
          style={{ backgroundColor: index % 2 === 0 ? "white" : "#354c7a" }}
          className="rounded-md"
        >
          <TableCell>
            <Button onClick={() => handleClick(row)} color="primary">
              إختيار
            </Button>
          </TableCell>
          <TableCell style={{ color: index % 2 === 0 ? "#354c7a" : "white" }}>
            {row.courseName}
          </TableCell>
          <TableCell style={{ color: index % 2 === 0 ? "#354c7a" : "white" }}>
            {row.time}
          </TableCell>
          <TableCell style={{ color: index % 2 === 0 ? "#354c7a" : "white" }}>
            {row.location}
          </TableCell>
          <TableCell style={{ color: index % 2 === 0 ? "#354c7a" : "white" }}>
            {row.doctorName}
          </TableCell>
        </TableRow>
      );
    });
  } else {
    // Render a placeholder or message when there is no data
    content = <div>No data available</div>;
  }

  //the title for the table and show the courses under it
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow className="bg-[#354c7a]" style={{ borderRadius: "8px" }}>
              <TableCell style={{ color: "white" }}>إختيار المادة </TableCell>
              <TableCell style={{ color: "white" }}>اسم المادة</TableCell>
              <TableCell style={{ color: "white" }}>الوقت</TableCell>
              <TableCell style={{ color: "white" }}>المكان</TableCell>
              <TableCell style={{ color: "white" }}>اسم المدرس</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{content}</TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDialog;

import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CourseField from "./CourseField";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store";
import { useEffect, useState } from "react";

function CreateCourse() {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };
  const { error, data } = useSelector((state) => {
    return state.course;
  });
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      courseId: "",
      courseName: "",
      time: "",
      doctorName: "",
      location: "",
      major: "",
    },
  });
  const COURSEFIELD = [
    { name: "courseId", label: "رقم المادة", message: "يجب ادخال رقم المادة" },
    {
      name: "courseName",
      label: "اسم المادة",
      message: "يجب ادخال اسم المادة",
    },
    { name: "time", label: "وقت المادة", message: "يجب ادخال وقت المادة" },
    {
      name: "doctorName",
      label: "اسم المدرس",
      message: "يجب ادخال اسم المدرس",
    },
    {
      name: "location",
      label: "موقع المحاضرة",
      message: "يجب ادخال موقع المحاضرة",
    },
    {
      name: "major",
      label: "اسم التخصص",
      message: "يجب ادخال اسم التخصص",
    },
  ];
  const onSubmit = (data) => {
    dispatch(
      createCourse({
        courseId: data.courseId,
        courseName: data.courseName,
        time: data.time,
        doctorName: data.doctorName,
        location: data.location,
        major: data.major,
      })
    );
  };
  let content;
  useEffect(() => {
    if (data.length > 0) {
      reset();
    }
  }, [data, reset]);
  if (data.length > 0) {
    content = (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className=""
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          className="bg-green-500 text-white"
        >
          تم نسجيل المادة بنجاح
        </Alert>
      </Snackbar>
    );
  }

  const renderedCourseField = COURSEFIELD.map((field) => {
    return (
      <label key={field.name}>
        {field.label}
        <Controller
          name={field.name}
          control={control}
          rules={{
            required: `${field.message}`,
          }}
          render={({ field, fieldState }) => (
            <CourseField
              field={field}
              fieldState={fieldState}
              placeholder={field.label}
              error={error}
            />
          )}
        />
      </label>
    );
  });

  return (
    <div>
      {content}
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderedCourseField}
        <p className="text-center text-red-500 mb-5">
          {error ? "رقم المادة او اسم المادة مكرران" : ""}
        </p>

        <div>
          <button type="submit">تسجيل المادة </button>
        </div>
      </form>
    </div>
  );
}
export default CreateCourse;

import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CourseField from "./CourseField";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store";
import { useEffect, useState } from "react";
import SideBar from '../SideBar'

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
    { name: "courseId", label: "رقم الماده", message: "يجب ادخال رقم الماده" },
    {
      name: "courseName",
      label: "اسم الماده",
      message: "يجب ادخال اسم الماده",
    },
    { name: "time", label: "وقت الماده", message: "يجب ادخال وقت الماده" },
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
          تم نسجيل الماده بنجاح
        </Alert>
      </Snackbar>
    );
  }

  const renderedCourseField = COURSEFIELD.map((field) => {
    return (
      <label key={field.name} className="text-[#354d7a] text-xl">
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
    <div className="flex justify-between items-start text-center">
      <div>
        <SideBar/>
      </div>
      <div className='flex h-7/12 justify-center items-start w-full mt-8'>
        {content}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderedCourseField}
          <p className="text-center text-red-500 mb-5">
            {error ? "رقم الماده او اسم المادة مكرران" : ""}
          </p>

          <div className="flex justify-center items-center">
            <button type="submit" className="bg-[#354d7a] text-white rounded-xl px-12 py-3 flex">تسجيل المادة </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateCourse;

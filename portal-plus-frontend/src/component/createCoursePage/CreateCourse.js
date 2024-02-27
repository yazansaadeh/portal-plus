import { useForm, Controller } from "react-hook-form";
import CourseField from "./CourseField";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store";

function CreateCourse() {
  const { error, content, isLoading } = useSelector((state) => {
    return state.course;
  });
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      courseId: "",
      courseName: "",
      time: "",
      doctorName: "",
      location: "",
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
  ];
  const onSubmit = (data) => {
    dispatch(
      createCourse({
        courseId: data.courseId,
        courseName: data.courseName,
        time: data.time,
        doctorName: data.doctorName,
        location: data.location,
      })
    );
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderedCourseField}
        <div>
          <button type="submit">تسجيل الدخول </button>
        </div>
      </form>
    </div>
  );
}
export default CreateCourse;

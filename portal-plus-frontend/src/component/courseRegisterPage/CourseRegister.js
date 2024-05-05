import { useForm, Controller } from "react-hook-form";
import Field from "./Field";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { courseRegister } from "../../store";
import CourseDialog from "./CourseDialog";
import { useState } from "react";
import SideBar from "../SideBar";
import { getUserCourse } from "../../store";
import { deleteCourse } from "../../store";

function CourseRegister() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      courseId: "",
    },
  });

  const { error } = useSelector((state) => {
    return state.course;
  });
  const { userData } = useSelector((state) => {
    return state.course;
  });
  const onSubmit = (data) => {
    dispatch(
      courseRegister({
        courseId: data.courseId,
      })
    );
  };
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
      return (
        <div
          key={row.course.id}
          className="flex flex-row justify-between items-center gap-2 p-4 w-full"
          style={{ backgroundColor: index % 2 === 0 ? "white" : "#334e7d" }}
        >
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {showDeleteBtn}
          </p>
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
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {row.course.doctorName}
          </p>
          <p
            style={{ color: index % 2 === 0 ? "#334e7d" : "white" }}
            className="w-1/5"
          >
            {row.course.location}
          </p>
        </div>
      );
    });
  } else {
    content = <p>you are not registered in any course</p>;
  }
  console.log(userData);

  return (
    <div className="flex justify-between items-start text-center">
      <div>
        <SideBar />
      </div>
      <div className="flex items-center justify-center flex-col w-screen">
        <div className="flex items-center w-10/12 h-8/12 justify-center flex-row gap-4 ">
          <div className="flex items-center justify-center">
            <button
              className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-full h-9 text-xs items-center justify-center"
              type="submit"
              onClick={handleOpenDialog}
            >
              المواد المتاحة
            </button>
            <CourseDialog
              setValue={setValue}
              open={isDialogOpen}
              onClose={handleCloseDialog}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-between  gap-4 flex-row mb-6"
          >
            <label>
              ادخل رقم المادة
              <Controller
                name="courseId"
                control={control}
                rules={{
                  required: "يجب ادخال رقم المادة",
                }}
                render={({ field, fieldState }) => (
                  <Field
                    field={field}
                    fieldState={fieldState}
                    placeholder="رقم المادة"
                    error={error}
                  />
                )}
              />
            </label>
            <div>
              <button
                className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-full h-9 mt-6"
                type="submit"
              >
                تسجيل
              </button>
            </div>
          </form>
        </div>
        <div className="bg-[#334e7d] text-white w-11/12 rounded-md mt-4 text-center flex items-center justify-between gap-2 flex-col">
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full">
            <p className="w-1/5 text-sm md:text-lg">حذف الماده</p>
            <p className="w-1/5 text-sm md:text-lg">رقم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">اسم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">وقت المحاضرة</p>
            <p className="w-1/5 text-sm md:text-lg">اسم المدرس</p>
            <p className="w-1/5 text-sm md:text-lg">موقع المحاضرة</p>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}
export default CourseRegister;

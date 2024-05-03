import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Field from "./Field";
import { useDispatch, useSelector } from "react-redux";
import { courseRegister } from "../../store";
import CourseDialog from "./CourseDialog";
import { useState } from "react";
import UserCourse from "../UserCourse";
import SideBar from '../SideBar'

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
  const onSubmit = (data) => {
    dispatch(
      courseRegister({
        courseId: data.courseId,
      })
    );
  };

  return (
    <div className='flex justify-between items-start text-center'>
      <div>
        <SideBar/>
      </div>
      <div className='flex items-center w-full h-8/12 justify-center flex-col gap-4 md:flex-row'>
        <div>
        <button className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in" type="submit"  onClick={handleOpenDialog}>  
          المواد المتاحة
        </button>
          <CourseDialog
            setValue={setValue}
            open={isDialogOpen}
            onClose={handleCloseDialog}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between flex-col gap-4 md:flex-row">
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
            <button className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in" type="submit">تسجيل</button>
          </div>
        </form>
        {/* <UserCourse /> */}
      </div>
    </div>
  );
}
export default CourseRegister;

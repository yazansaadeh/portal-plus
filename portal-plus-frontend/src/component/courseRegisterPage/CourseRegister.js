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
      <div className='flex items-center w-full h-8/12 justify-center flex-col'>
        <div>
          <Button variant="contained" onClick={handleOpenDialog}>
            المواد المتاحة
          </Button>
          <CourseDialog
            setValue={setValue}
            open={isDialogOpen}
            onClose={handleCloseDialog}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">تسجيل</button>
          </div>
        </form>
        {/* <UserCourse /> */}
      </div>
    </div>
  );
}
export default CourseRegister;

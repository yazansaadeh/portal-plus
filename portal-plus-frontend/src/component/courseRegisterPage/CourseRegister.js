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
      <div className="flex items-center justify-center flex-col w-screen">
        <div className='flex items-center w-10/12 h-8/12 justify-center flex-row gap-4 '>
          <div className="flex items-center justify-center">
            <button className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-full h-9 text-xs items-center justify-center" type="submit"  onClick={handleOpenDialog}>  
              المواد المتاحة    
            </button>
              <CourseDialog
                setValue={setValue}
                open={isDialogOpen}
                onClose={handleCloseDialog}
              />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-between  gap-4 flex-row mb-6">
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
              <button className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-full h-9 mt-6" type="submit">تسجيل</button>
            </div>
          </form>
        </div>
        <div className="bg-[#334e7d] text-white w-11/12 rounded-md mt-4 text-center flex items-center justify-between gap-2 flex-col">
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full">
            <p className="w-1/5 text-sm md:text-lg">رقم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">اسم الماده</p>
            <p className="w-1/5 text-sm md:text-lg">وقت المحاضرة</p>
            <p className="w-1/5 text-sm md:text-lg">اسم المدرس</p>
            <p className="w-1/5 text-sm md:text-lg">موقع المحاضرة</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full bg-white text-[#334e7d] ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
          </div> 
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
          </div> 
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full bg-white text-[#334e7d] ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
          </div> 
          <div className="flex flex-row justify-between items-center gap-2 p-4 w-full ">
            <p className="w-1/5"> 11245221</p>
            <p className="w-1/5"> هندسة البرمجيات</p>
            <p className="w-1/5"> 11-12 </p>
            <p className="w-1/5">  خالد المخادمه</p>
            <p className="w-1/5">  مبنى الحسين الباني</p>
          </div> 
        </div>
      </div>
    </div>
  );
}
export default CourseRegister;

import { useDispatch, useSelector } from "react-redux";
import { generateQRCode, takeAttendance } from "../../store";
import { useForm, Controller } from "react-hook-form";
import ConfirmGenerateDialog from "./ConfirmGenerateDialog";
import { useState } from "react";
import SideBar from "../SideBar";

function GenerateQRCode() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    setIsDialogOpen(false);
    dispatch(
      takeAttendance({
        courseId: watch("courseId"),
      })
    );

    const intId = setInterval(() => {
      dispatch(
        generateQRCode({
          courseId: watch("courseId"),
        })
      );
    }, 7000);

    setTimeout(() => {
      clearInterval(intId);
    }, 20000);
  };

  const { data, error } = useSelector((state) => state.attendance);

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      courseId: "",
    },
  });

  const onSubmit = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-between items-start text-center">
      <SideBar />
      <div className="flex flex-col items-start justify-center  space-y-6 h-4/12 w-screen my-12">
        <ConfirmGenerateDialog open={isDialogOpen} onConfirm={handleConfirm} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-6 text-center text-2xl space-y-3 text-[#354d7a]">
            ادخل رقم الماده
          </label>
          <label className="block mb-6 text-center text-2xl space-y-3">
            <Controller
              name="courseId"
              control={control}
              rules={{
                required: "يجب ادخال رقم الماده",
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    type="text"
                    {...field}
                    placeholder="رقم الماده"
                  />
                  {fieldState.error && (
                    <p className="text-red-500">{fieldState.error.message}</p>
                  )}
                  {
                    <p className="text-red-500">
                      {error ? "يجب ان تكون مدرس في هذه الماده" : ""}
                    </p>
                  }
                </div>
              )}
            />
          </label>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#354d7a] text-white rounded-xl px-12 py-2 flex justify-center items-center text-xl"
            >
              إنشاء
            </button>
          </div>
        </form>
        {data && (
          <img
            src={data}
            alt="QRCode"
            className="mt-8 max-w-full  md:max-h-96"
          />
        )}
      </div>
    </div>
  );
}
export default GenerateQRCode;

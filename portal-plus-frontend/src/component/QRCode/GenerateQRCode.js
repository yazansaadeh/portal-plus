import { useDispatch, useSelector } from "react-redux";
import { generateQRCode, takeAttendance } from "../../store";
import { useForm, Controller } from "react-hook-form";
import ConfirmGenerateDialog from "./ConfirmGenerateDialog";
import { useState } from "react";

function GenerateQRCode() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    // Set a timeout for 5 minutes
    setTimeout(() => {
      clearInterval(intId); // Clear the interval after 5 minutes
    }, 20000); // 5 minutes in milliseconds
  };
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => {
    return state.attendance;
  });
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      courseId: "",
    },
  });

  const onSubmit = (data) => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <ConfirmGenerateDialog open={isDialogOpen} onConfirm={handleConfirm} />
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
              <div>
                <input
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  type="text"
                  {...field}
                  placeholder="رقم المادة"
                />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
                {
                  <p className="text-red-500">
                    {error ? "يجب ان تكون مدرس في هذه المادة" : ""}
                  </p>
                }
              </div>
            )}
          />
        </label>
        <div>
          <button type="submit">إنشاء</button>
        </div>
      </form>
      {data ? <img src={data} alt="QRCode" /> : ""}
    </div>
  );
}
export default GenerateQRCode;

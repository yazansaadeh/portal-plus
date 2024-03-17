import { useDispatch, useSelector } from "react-redux";
import { generateQRCode } from "../store";
import { useForm, Controller } from "react-hook-form";

function GenerateQRCode() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.attendance;
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      courseId: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      generateQRCode({
        courseId: data.courseId,
      })
    );
  };

  return (
    <div>
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

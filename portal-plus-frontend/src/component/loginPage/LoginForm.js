import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginField from "./LoginField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store";
import { useEffect } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const { error, content, isLoading } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  useEffect(() => {
    if (!error && content) {
      navigate("/dashboard");
    }
  }, [error, content, navigate]);
  const onSubmit = (data) => {
    dispatch(
      login({
        username: data.username,
        password: data.password,
      })
    );
  };

  return (
    <div className="bg-[#334e7d]  w-dvw h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center w-full h-full">
        <img
          src="/HU logo.png"
          alt="HU_logo"
          className="rounded-md h-36 w-36	mb-10"
        />
        <div className="bg-white px-6 pb-6 rounded-md w-full md:w-1/2 h-auto">
          <div className="pb-7">
            <p className="text-center text-3xl pb-3 mt-3">تسجيل الدخول</p>
            <hr />
          </div>
          <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <label className="w-full">
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "الرقم الجامعي مطلوب",
                  }}
                  render={({ field, fieldState }) => (
                    <LoginField
                      field={field}
                      fieldState={fieldState}
                      placeholder="الرقم الجامعي"
                      type="text"
                      error={error}
                    />
                  )}
                />
              </label>
              <label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "كلمة السر مطلوبة",
                  }}
                  render={({ field, fieldState }) => (
                    <LoginField
                      field={field}
                      fieldState={fieldState}
                      type="password"
                      placeholder="كلمة المرور"
                      error={error}
                    />
                  )}
                />
              </label>
              <p className="text-center text-red-500 mb-5">
                {error ? "هناك خطأ في معلومات المستخدم" : ""}
              </p>
              <div className="flex justify-center ">
                <button
                  className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in"
                  type="submit"
                >
                  تسجيل الدخول{" "}
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 mr-3"></div>
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

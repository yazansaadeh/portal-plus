import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginField from "./LoginField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store";
import { useEffect } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const { error, content } = useSelector((state) => {
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
    console.log(error, content);
    if (error) {
      navigate("/login");
    }
    if (!error && content) {
      navigate("/dashboard");
    }
  }, [error, content, navigate]);
  const onSubmit = (data) => {
    dispatch(
      loginUser({
        username: data.username,
        password: data.password,
      })
    );
  };

  return (
    <div>
      <p className="text-red-700">test</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          UserId:
          <Controller
            name="username"
            control={control}
            rules={{
              required: "UserId is required",
            }}
            render={({ field, fieldState }) => (
              <LoginField field={field} fieldState={fieldState} type="text" />
            )}
          />
        </label>
        <label>
          Password:
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
            render={({ field, fieldState }) => (
              <LoginField
                field={field}
                fieldState={fieldState}
                type="password"
              />
            )}
          />
        </label>

        <button className="" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

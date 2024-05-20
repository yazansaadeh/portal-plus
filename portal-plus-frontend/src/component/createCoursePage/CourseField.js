import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDoctorName } from "../../store";

function CourseField({ field, fieldState, placeholder, name }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctorName());
  }, []);
  const { doctorsName } = useSelector((state) => {
    return state.auth;
  });

  let content;
  if (name === "doctorName") {
    content = (
      <select
        {...field}
        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
      >
        {doctorsName.map((data) => {
          return (
            <option key={Math.random() * 100} value={data.name}>
              {data.name}
            </option>
          );
        })}
      </select>
    );
  } else {
    content = (
      <input
        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        type="text"
        {...field}
        placeholder={placeholder}
      />
    );
  }
  return (
    <div>
      {content}
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}

export default CourseField;

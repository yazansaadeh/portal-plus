import { useDispatch, useSelector } from "react-redux";
import { getUserCourse } from "../store";
import { useEffect } from "react";

function Map() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => {
    return state.course;
  });
  useEffect(() => {
    dispatch(getUserCourse());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center h-auto">
        <img
          className="rounded-md h-1/5 w-1/5"
          src="university map.jpg"
          alt="University Map"
        />
      </div>
    </div>
  );
}
export default Map;

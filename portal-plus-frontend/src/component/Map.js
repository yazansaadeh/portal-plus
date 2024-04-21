import { useDispatch, useSelector } from "react-redux";
import { getUserCourse } from "../store";
import { useEffect } from "react";
import SideBar from './SideBar'

function Map() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => {
    return state.course;
  });
  useEffect(() => {
    dispatch(getUserCourse());
  }, [dispatch]);

  return (
    <div className='flex justify-between items-start text-center'>
      <SideBar/>
    </div>
  );
}
export default Map;

import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect } from "react";

// userPfp isn't showing
function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    dispatch(getName());
  }, [dispatch]);
  return (
    <div className="bg-[#334e7d] flex justify-between h-16 p-3">
      <p className="text-white mr-16 text-3xl">HU's PORTAL</p>
      <div className="flex justify-between items-center">
        <div className="bg-white rounded-full h-9 w-9 flex justify-center items-center">
          <img src='/userPfp.jpg' className="rounded-full"></img>
        </div>
        <p className="text-white text-lg px-4 font-medium"> {name}</p>
      </div>
    </div>
  );
}
export default Header;

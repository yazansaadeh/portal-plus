import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect } from "react";

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
      <p className="text-white text-lg">{name}</p>
    </div>
  );
}
export default Header;

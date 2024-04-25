import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import SimpleMenu from "./Menu";

function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    dispatch(getName());
  }, [dispatch]);
  const navigate = useNavigate();

  return (
    <div className="bg-[#334e7d] flex justify-between items-center h-12">
      <p
        className="text-white mr-16 text-3xl hover:cursor-pointer hidden sm:flex"
        onClick={() => navigate("/dashboard")}
      >
        HU's PORTAL
      </p>
      <GiHamburgerMenu className="flex sm:hidden text-white text-3xl cursor-pointer justify-center items-center mr-6" />
      <div className="flex justify-between items-center hover:cursor-pointer ml-4">
        <div className="flex">
          <div className="bg-white rounded-full h-9 w-9 flex justify-center items-center">
            <img
              alt="userImg"
              src="/userPfp.jpg"
              className="rounded-full"
            ></img>
          </div>
          <p className="text-white text-lg pr-4 font-medium hidden sm:flex">
            {" "}
            {name}
          </p>
          <SimpleMenu />
        </div>
      </div>
    </div>
  );
}
export default Header;

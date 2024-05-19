import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect } from "react";
import { getRule } from "../store/";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, userId, rule } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(getName());
    dispatch(getRule());
  }, [dispatch]);

  const handleLogout = () => { 
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <div
        className={`bg-[#334e7d] flex items-center justify-between flex-col w-64 absolute top-12 left-0 p-5 hidden md:flex `}
      >
        <img
          alt="userImg"
          src="/userPfp.jpg"
          className="rounded-full h-16 w-16"
        />
        <p className="text-white text-xl px-4 pt-2 font-medium hidden sm:flex">
          {name}
        </p>
        <p className="text-white text-xs px-4 hidden sm:flex">
          هندسة البرمجيات
        </p>
        <div className="flex flex-row items-center justify-between m-2 w-full flex-col gap-2">
          <div className="w-full bg-white flex items-center justify-between rounded-md">
              <BiSolidEdit className="bg-white text-[#354d7a] text-2xl m-2 cursor-pointer"/>
              <input placeholder="ادخل بريدك الالكتروني" className="text-left px-2 rounded-md text-sm ml-2 border-none outline-none"></input>
          </div>
          <div className="w-full bg-white flex items-center justify-between rounded-md">
              <BiSolidEdit className="bg-white text-[#354d7a] text-2xl m-2 cursor-pointer"/>
              <input placeholder="ادخل ساعاتك المكتبيه" className="text-left px-2 rounded-md text-sm ml-2 border-none outline-none"></input>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between m-2 w-full gap-2 text-[#354d7a] flex-col bg-white px-2 rounded-md text-center ">
            <div className="m-1">
              <p>البريد الالكتروني للمدرس :  </p>
              <p>salimobada184@gmail.com</p>
            </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button
            className="bg-white text-[#354d7a] rounded-xl flex hover:text-[#5175BA] text-xs border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-24 h-10 flex items-center justify-center"
            type="submit"
            onClick={handleLogout}
          >
            تسجيل خروج
          </button>
          <button
            className="bg-white text-[#354d7a] rounded-xl flex hover:text-[#5175BA] text-xs border-solid border-2 border-[#354d7a] transition duration-150 ease-in w-24 h-10 flex items-center justify-center"
            type="submit"
          >
            تغيير كلمة السر
          </button>
        </div>
      </div>
    </div>
  );
};

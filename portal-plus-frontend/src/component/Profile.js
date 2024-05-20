import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect, useState } from "react";
import { getRule } from "../store/";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { storeOfficeDay } from "../store";
import { storeOfficeHour } from "../store";

export const Profile = () => {
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [officeHourValue, setOfficeHourValue] = useState("");
  const [dayValue, setDayValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, userId, rule, officeHour, officeDay } = useSelector((state) => {
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

  const handleSwitchFirstInput = () => {
    setShowFirstInput(!showFirstInput);
  };
  const handleSwitchSecondInput = () => {
    setShowSecondInput(!showSecondInput);
  };
  const handleDayChange = (event) => {
    setDayValue(event.target.value);
  };
  const handleOfficeHourChange = (event) => {
    setOfficeHourValue(event.target.value);
  };
  const handleStoreOfficeHour = () => {
    setShowFirstInput(!showFirstInput);
    dispatch(storeOfficeHour({ officeHour: officeHourValue }));
  };
  const handleStoreOfficeDay = () => {
    setShowSecondInput(!showSecondInput);
    dispatch(storeOfficeDay({ officeDay: dayValue }));
  };
  let content;
  if (rule === "doctor") {
    content = (
      <div className="flex flex-row items-center justify-between m-2 w-full flex-col gap-2">
        <div className="w-full bg-white flex items-center justify-between rounded-md">
          {showFirstInput ? (
            <FaCheck
              onClick={handleStoreOfficeHour}
              className="bg-white text-[#354d7a] text-2xl m-2 cursor-pointer"
            />
          ) : (
            <BiSolidEdit
              onClick={handleSwitchFirstInput}
              className="bg-white text-[#354d7a] text-2xl m-2 cursor-pointer"
            />
          )}
          {showFirstInput ? (
            <input
              value={officeHourValue}
              onChange={handleOfficeHourChange}
              placeholder="الساعات المكتبية"
              className="text-left px-2 rounded-md text-sm ml-2 border-none outline-none"
            ></input>
          ) : (
            <p>{officeHour ? officeHour : "يرجى ادخال الساعات المكتبية"}</p>
          )}
        </div>
        <div className="w-full bg-white flex items-center justify-between rounded-md">
          {showSecondInput ? (
            <FaCheck
              onClick={handleStoreOfficeDay}
              className="bg-white text-[#354d7a] text-2xl m-2 cursor-pointer"
            />
          ) : (
            <BiSolidEdit
              onClick={handleSwitchSecondInput}
              className="bg-white text-[#354d7a] text-2xl m-2 cursor-pointer"
            />
          )}
          {showSecondInput ? (
            <input
              value={dayValue}
              onChange={handleDayChange}
              placeholder="الايام"
              className="text-left px-2 rounded-md text-sm ml-2 border-none outline-none"
            ></input>
          ) : (
            <p>
              {officeDay ? officeDay : "يرجى ادخال الايام للساعات المكتبية"}
            </p>
          )}
        </div>
      </div>
    );
  } else {
    content = "";
  }
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
        {content}
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

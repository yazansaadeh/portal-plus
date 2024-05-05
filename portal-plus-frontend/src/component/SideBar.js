import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store/";
import { useEffect, useState } from "react";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BsArrowDown } from "react-icons/bs";
import { getRule } from "../store/";

function SideBar() {
  const dispatch = useDispatch();
  const { name, userId, rule } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(getName());
    dispatch(getRule());
  }, [dispatch]);

  // const [open, setOpen] = useState(true);
  const [subMenu, setSubMenu] = useState({}); // Use an object to track submenu state for each menu item
  let menus = [];
  if (rule === "doctor") {
    menus = [
      { title: "الخدمات الماليه" },
      {
        title: "خدمات التسجيل",
        submenu: true,
        submenuItems: [
          { title: "انشاء ماده", path: "/createCourse" },
          { title: "جدول المدرس", path: "/userCourse" },
        ],
      },
      { title: "الامتحانات" },
      { title: "العلامات" },
      { title: "الدراسات العليه" },
      {
        title: "خدمات اخرى",
        submenu: true,
        submenuItems: [
          { title: "خارطة الجامعه", path: "/map" },
          { title: "الية التدريب الميداني", path: "/showTrainingFile" },
          { title: " اخذ الحضور والغياب   ", path: "/generateQRCode" },
        ],
      },
      { title: "تواصل معنا" },
    ];
  } else if (rule === "student") {
    menus = [
      { title: "الخدمات الماليه" },
      {
        title: "خدمات التسجيل",
        submenu: true,
        submenuItems: [
          { title: "تسجيل ماده", path: "/courseRegister" },
          { title: "جدول الطالب", path: "/userCourse" },
        ],
      },
      { title: "الامتحانات" },
      { title: "العلامات" },
      { title: "تقييم الهيئة " },
      { title: "الدراسات العليه" },
      {
        title: "خدمات اخرى",
        submenu: true,
        submenuItems: [
          { title: "خارطة الجامعه", path: "/map" },
          { title: "الية التدريب الميداني", path: "/training" },
          { title: " تسجيل الحضور  ", path: "/scanQRCode" },
        ],
      },
      { title: "تواصل معنا" },
    ];
  }

  const toggleSubMenu = (index) => {
    setSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="w-screen sm:w-72 flex items-center justify-between hidden sm:flex">
      {/* sidebar */}
      <div className="flex h-screen">
        <div
          className={`bg-[#334E7D] p-5 pt-8 w-48 flex transition-all duration-300 ease-in-out sm:w-72 rounded-md mr-4  flex-col`}
        >
          <div className="inline-flex items-center h-12">
            <img
              src="/userPfp.jpg"
              className="rounded-full cursor-pointer duration-300 w-8 h-8 mr-3 sm:h-12 sm:w-12"
              alt="pfpImage"
            ></img>
            <div className="flex  flex-col mr-4">
              <h1
                className={`text-white font-medium text-sm sm:text-lg w-full`}
              >
                {name}
              </h1>
              <h3
                className={`text-white font-medium text-sm duration-300 p-1 text-center`}
              >
                2035978
              </h3>
            </div>
          </div>
          <ul className="pt-2">
            {menus.map((menu, index) => (
              <li
                key={index}
                className="text-xs sm:text-md flex-items-center gap-x-4 cursor-pointer rounded-md mt-2 bg-white text-[#334E7D]  duration-300 p-2 flex  items-center justify-between flex-col mx-2"
                onClick={() => toggleSubMenu(index)}
              >
                <div className="flex items-center justify-between flex-row w-full">
                  <span>
                    <FaRegMoneyBill1 className="text-sm text-[#334E7D]" />
                  </span>
                  <span className="text-[#334E7D] w-full text-center">
                    {menu.title}
                  </span>
                  <BsArrowDown className="text-sm text-[#334E7D]" />
                </div>
                <div className="flex items-center justify-center text-center">
                  {menu.submenu && subMenu[index] && (
                    <ul className="ml-4 w-full flex items-center justify-center flex-col">
                      {menu.submenuItems.map((submenuItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="text-[#334E7D] text-xs sm:text-md cursor-pointer rounded-md mt-2  duration-300 p-2 hover:text-white hover:bg-[#334E7D] w-40 sm:w-64"
                          onClick={() => handleClick(submenuItem.path)}
                        >
                          <span>{submenuItem.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

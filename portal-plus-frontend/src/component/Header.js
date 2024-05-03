import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store";
import { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BsArrowDown } from "react-icons/bs";
import { getRule } from "../store/";

function Header() {
  const dispatch = useDispatch();
  const { name, userId, rule } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(getName());
    dispatch(getRule());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
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
          { title: "الية التدريب الميداني" },
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
          { title: "الية التدريب الميداني" },
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

  useEffect(() => {
    dispatch(getName());
  }, [dispatch]);
  return (
<<<<<<< HEAD
    <div>
      <div>
        <div className="bg-[#334e7d] flex justify-between items-center h-12 mb-6">
        <p
          className="text-white mr-16 text-3xl hover:cursor-pointer hidden sm:flex"
          onClick={() => navigate("/dashboard")}
        >
          HU's PORTAL
        </p>
        {/* menu button */}
        <GiHamburgerMenu className="flex sm:hidden text-white text-3xl cursor-pointer justify-center items-center mr-6" onClick={()=>setOpen(!open)}/>
        <div className="flex justify-between items-center hover:cursor-pointer ml-4">
          <div className="bg-white rounded-full h-9 w-9 flex justify-center items-center">
            <img alt="userImg" src="/userPfp.jpg" className="rounded-full"></img>
          </div>
          <p className="text-white text-lg px-4 font-medium hidden sm:flex">
            {" "}
            {name}
          </p>
=======
    <div className="bg-[#334e7d] flex justify-between items-center h-12 mb-6">
      <p
        className="text-white mr-16 text-3xl hover:cursor-pointer hidden sm:flex"
        onClick={() => navigate("/dashboard")}
      >
        HU's PORTAL
      </p>
      {/* menu button */}
      <GiHamburgerMenu className="flex sm:hidden text-white text-3xl cursor-pointer justify-center items-center mr-6" />
      <div className="flex justify-between items-center hover:cursor-pointer ml-4">
        <div className="bg-white rounded-full h-9 w-9 flex justify-center items-center">
          <img alt="userImg" src="/userPfp.jpg" className="rounded-full"></img>
>>>>>>> bdd14150c49bc965fb905f45f56d288772695047
        </div>
      </div>
    </div>
    <div>
      <div className={`w-screen flex items-center justify-center ${open ? 'w-80' : 'hidden '} mx-auto sm:hidden bg-white`}  style={{
      position: 'absolute',
      left: '50%',
      top: '60%',
      transform: 'translate(-50%,-50%)'
}}>
        {/* sidebar */}
        <div className="flex h-screen w-screen">
          <div
            className={`bg-[#334E7D] pt-8 w-screen flex transition-all duration-300 ease-in-out rounded-md flex-col`}
          >
            <div className="inline-flex items-center h-12 justify-center flex-col gap-2 m-4">
              <img
                src="/userPfp.jpg"
                className="rounded-full cursor-pointer duration-300 w-12 h-12 mr-3 sm:h-12 sm:w-12"
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
    </div>
    </div>
  );
}
export default Header;
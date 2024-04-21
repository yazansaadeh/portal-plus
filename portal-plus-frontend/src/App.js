import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoginForm from "./component/loginPage/LoginForm";
import CreateCourse from "./component/createCoursePage/CreateCourse";
import CourseRegister from "./component/courseRegisterPage/CourseRegister";
import UserCourse from "./component/UserCourse";
import LandingPage from "./component/LandingPage";
import Map from "./component/Map";
import Header from "./component/Header";
import Footer from "./component/Footer";
import UserProfile from "./component/UserProfile";
import GenerateQRCode from "./component/QRCode/GenerateQRCode";
import ScanQRCode from "./component/QRCode/ScanQRCode";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "./store/";
import { useEffect,useState } from "react";
import { FaRegMoneyBill1 } from "react-icons/fa6";import { BsArrowDown } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";
import SideBar from './component/SideBar'
const Dashboard = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(getName());
  }, [dispatch]);

  const [open, setOpen] = useState(true);
  const [subMenu, setSubMenu] = useState({}); // Use an object to track submenu state for each menu item
  const menus = [
    { title: 'الخدمات الماليه' },
    { title: 'خدمات التسجيل',
      submenu: true,
      submenuItems: [
        { title: 'انشاء ماده',path:"/createCourse" },
        { title: 'تسجيل ماده',path:"/courseRegister" },
        { title: 'جدول الطلب',path:"/userCourse" },
      ]
    },
    { title: 'الامتحانات' },
    { title: 'العلامات' },
    { title: 'تقييم الهيئة ' },
    { title: 'الدراسات العليه' },
    { title: 'خدمات اخرى',
      submenu: true,
      submenuItems: [
        { title: 'خارطة الجامعه',path:"/map" },
        { title: 'الية التدريب الميداني' },
        { title: ' تسجيل الحضور  ',path:"/scanQRCode" },
        { title: ' اخذ الحضور والغياب   ',path:"/generateQRCode" },
      ]
    },
    { title: 'تواصل معنا' },
  ];
  
  const toggleSubMenu = (index) => {
    setSubMenu(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle submenu state for the given index
    }));
  };
  const navigate = useNavigate()
  function handleClick(path){
    navigate(path)
  }
  return (
    <div className='w-full flex items-center justify-between bg-slate-100	'>
      {/* sidebar */}
      <div className='flex h-screen  my-8 mb-12 '>
        <div className={`bg-[#334E7D] p-5 pt-8 w-48 ${open ? 'flex' : 'hidden'} transition-all duration-300 ease-in-out sm:w-72 rounded-md mr-4  flex-col`}>
          <div className='inline-flex items-center h-12'>
            <img src='/userPfp.jpg' className="rounded-full cursor-pointer duration-300 w-8 h-8 mr-3 sm:h-12 sm:w-12" alt="pfpImage"></img>
            <div className="flex  flex-col mr-4">
              <h1 className={`text-white font-medium text-sm sm:text-xl w-full`} >
                {name}
              </h1>
              <h3 className={`text-white font-medium text-sm duration-300 p-1`} >
                2035978
              </h3>
            </div>
          </div>
          <ul className="pt-2">
            {menus.map((menu, index) => (
              <li key={index} className="text-white text-xs sm:text-md flex-items-center gap-x-4 cursor-pointer rounded-md mt-2 bg-white text-[#334E7D]  duration-300 p-2 flex  items-center justify-between flex-col mx-2" onClick={() => toggleSubMenu(index)}>
                <div className='flex items-center justify-between flex-row w-full'>
                  <span><FaRegMoneyBill1 className='text-sm text-[#334E7D]' /></span>
                  <span className='text-[#334E7D] w-full text-center'>{menu.title}</span>
                  <BsArrowDown  className='text-sm text-[#334E7D]' /> 
                </div>
                <div className='flex items-center justify-center text-center'>
                {menu.submenu && subMenu[index] &&  ( 
                  <ul className="ml-4 w-full flex items-center justify-center flex-col"> 
                    {menu.submenuItems.map((submenuItem, subIndex) => (
                      <li key={subIndex} className="text-[#334E7D] text-xs sm:text-md cursor-pointer rounded-md mt-2  duration-300 p-2 hover:text-white hover:bg-[#334E7D] w-40 sm:w-64" onClick={()=>handleClick(submenuItem.path)}
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
      {/* container */}
      <div className='flex justify-center flex-col w-screen mr-12 h-8/12 mb-48'>
        <h1 className='font-medium text-lg sm:text-3xl text-[#334e7d]'>
          بوابة الطالب الألكترونية
        </h1>
        <div className='bg-[#334e7d] text-white w-11/12 h-44 sm:h-44 rounded-md mt-4 text-center sm:text-right flex justify-center flex-col'>
            <div className='flex items-center p-4'>
                <IoIosNotifications className='text-md sm:text-3xl ml-2' />
                <p className='text-md sm:text-xl font-medium'> ملاحظات هامة جداً :  </p>
            </div>
            <div className='text-md sm:text-xl px-4 font-medium'>
            للطلاب القدامى فقط ستبدأ غرامة التأخير من تاريخ 03-03-2023 للعام الدراسي 2022 الفصل الدراسي الثاني
            </div>
        </div>
        <div className='grid grid-cols-4 grid-rows-2 gap-2 hover:cursor-pointer w-11/12'>
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around  hover:bg-[#7083A4] duration-300px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
            <div className='bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row'>
              <p className='text-md sm:text-xl text-white'>استبانات</p>
              <FaNoteSticky className='hidden lg:flex text-3xl text-white'/>
            </div> 
        </div>
      </div>
    </div>
  );
  
};



function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <div>
                  <Header />
                  <Dashboard />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/createCourse"
              element={
                <div>
                  <Header />
                  <CreateCourse />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/courseRegister"
              element={
                <div>
                  <Header />
                  <CourseRegister />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/userCourse"
              element={
                <div>
                  <Header />
                  <UserCourse />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/map"
              element={
                <div>
                  <Header />
                  <Map />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div>
                  <Header />
                  <UserProfile />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/generateQRCode"
              element={
                <div>
                  <Header />
                  <GenerateQRCode />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/scanQRCode"
              element={
                <div>
                  <Header />
                  <ScanQRCode />
                  <Footer />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

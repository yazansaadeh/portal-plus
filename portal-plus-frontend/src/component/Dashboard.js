import { IoIosNotifications } from "react-icons/io";
import { FaNoteSticky } from "react-icons/fa6";
import SideBar from "./SideBar";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
const Dashboard = () => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <SideBar className='hidden sm:flex'/>
      {/* container */}
      <div className="flex justify-center flex-col w-screen mr-12 h-8/12 mt-24 md:mt-18">
        <h1 className="font-medium text-lg sm:text-3xl text-[#334e7d]">
          بوابة الطالب الألكترونية
        </h1>
        <div className="bg-[#334e7d] text-white w-11/12 h-44 sm:h-44 rounded-md mt-4 text-center sm:text-right flex justify-center flex-col">
          <div className="flex items-center p-2">
            <IoIosNotifications className="text-md sm:text-3xl ml-2" />
            <p className="text-md sm:text-lg font-medium">
              {" "}
              ملاحظات هامة جداً :{" "}
            </p>
          </div>
          <div className="text-md sm:text-xl px-4 font-medium">
            للطلاب القدامى فقط ستبدأ غرامة التأخير من تاريخ 03-03-2023 للعام
            الدراسي 2022 الفصل الدراسي الثاني
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-4 md:grid-cols-4 grid-rows-2 gap-2 hover:cursor-pointer w-11/12 mt-4">
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">استبانات</p>
            <FaNoteSticky className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white"> التسجيل عبر الهاتف</p>
            <IoMdPhonePortrait className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">تحديد رسوم الساعات</p>
            <FaRegMoneyBill1 className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">تفعيل خدمة الرسائل </p>
            <IoMdPhonePortrait className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">تنزيل برنامج التسجيل  </p>
            <IoMdPhonePortrait className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">علامات الطالب</p>
            <IoCheckmarkDoneSharp  className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around  hover:bg-[#7083A4] duration-300px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">البريد الالكتروني</p>
            <MdEmail  className="hidden lg:flex text-3xl text-white" />
          </div>
          <div className="bg-[#334e7d] flex items-center justify-around hover:bg-[#7083A4] duration-300 px-4 text-center h-24 my-2 rounded-md flex-col md:flex-row">
            <p className="text-md sm:text-xl text-white">منصة الامتحانات الالكترونية </p>
            <BsFileEarmarkSpreadsheet  className="hidden lg:flex text-3xl text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

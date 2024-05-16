import "leaflet/dist/leaflet.css";
import SideBar from "./SideBar";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import useGeoLocation from "../hooks/useGeoLocation";
import "leaflet-routing-machine";
import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "../store/";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BsArrowDown } from "react-icons/bs";
import { getRule } from "../store/";

const buildingLocation = [
  {
    label: "بوابة عمان",
    value: "32.10016,36.18994",
  },
  {
    label: "البوابة الرئيسية",
    value: "32.10303,36.18094",
  },
  {
    label: "بوابة الزرقاء",
    value: "32.10576,36.18348",
  },
  {
    label: "كلية الملكة رانيا للطفولة",
    value: "32.10672,36.18397",
  },
  {
    label: "كلية الصيدلة",
    value: "32.10647,36.18621",
  },
  {
    label: "كلية الطب",
    value: "32.10514,36.18453",
  },
  {
    label: "كلية التمريض",
    value: "32.10483,36.18484",
  },
  {
    label: "كلية العلوم الطبية",
    value: "32.10540,36.18423",
  },
  {
    label: "مبنى الحارث الرابع",
    value: "32.10513,36.18418",
  },
  {
    label: "بنك القاهرة عمان",
    value: "32.10429,36.18517",
  },
  {
    label: "مبنى الدراسات العليا",
    value: "32.10391,36.18557",
  },
  {
    label: "مبنى القبول والتسجيل",
    value: "32.10360,36.18596",
  },
  {
    label: "مكتبة عبد الحميد شومان",
    value: "32.10372,36.18616",
  },
  {
    label: "مطاعم الجامعة",
    value: "32.10311,36.18729",
  },
  {
    label: "مبنى عمادة شؤون الطلبة",
    value: "32.10251,36.18630",
  },
  {
    label: "مبنى ادارة الجامعة الهاشمية",
    value: "32.10209,36.18579",
  },
  {
    label: "الرياضيات",
    value: "32.10242,36.18793",
  },
  {
    label: "العلوم",
    value: "32.10279,36.18835",
  },
  {
    label: "كلية الاعمال",
    value: "32.10433,36.18545",
  },
  {
    label: "مبنى القاعات الصفية الغربي",
    value: "32.10477,36.18640",
  },
  {
    label: "مبنى القاعات الصفية الشرقي",
    value: "32.10250,36.18893",
  },
  {
    label: "كلية الكيمياء",
    value: "32.10273,36.18975",
  },
  {
    label: "كلية العلوم الحياتية",
    value: "32.10243,36.18937",
  },
  {
    label: "كلية الفيزياء",
    value: "32.10210,36.18895",
  },
  {
    label: "كلية الموارد الطبيعية",
    value: "32.10175,36.18855",
  },
  {
    label: "مبنى الحسين الباني",
    value: "32.10064,36.18937",
  },
  {
    label: "كلية الهندسة",
    value: "32.10124,36.18746",
  },
  {
    label: "كلية تكنلوجيا المعلومات",
    value: "32.10016,36.18584",
  },
  {
    label: "كلية الرياضة",
    value: "32.10051,36.18472",
  },
  {
    label: "المركز الصحي",
    value: "32.10685,36.18516",
  },
];
function Map() {
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
  const routingControl = useRef(null);

  const [fromLocation, setFromLocation] = useState("32.10016,36.18994");
  const [toLocation, setToLocation] = useState("32.10016,36.18994");

  const handleFromChange = (e) => {
    routingControl.current.removeRoutingControl();
    setFromLocation(e.target.value);
  };

  const handleToChange = (e) => {
    routingControl.current.removeRoutingControl();
    setToLocation(e.target.value);
  };

  const fromLocationCoordinates = fromLocation.split(",");
  const toLocationCoordinates = toLocation.split(",");

  const markerIcon = new L.Icon({
    iconUrl: "/marker2.png",
    iconSize: [35, 45],
  });

  const location = useGeoLocation();
  const userPosition = [location.coordinates.lat, location.coordinates.lng];

  function SetViewOnMarker() {
    const map = useMap();
    map.setView(userPosition, map.getZoom());
    return null;
  }
  console.log(fromLocationCoordinates);
  console.log(toLocationCoordinates);
  return (
    <div className="flex justify-between items-start text-center" >
      <div style={{zIndex:'999'}}>
      <div className="w-72 flex items-center justify-between hidden sm:flex" style={{zIndex:'999'}}>
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
    <SideBar />
      </div>
      <div className="w-full mr-0 md:mr-4 h-screen" style={{zIndex:1}}>
        <div className="flex items-center justify-around flex-col py-6">
          <div>
            <label htmlFor="buildings">من:</label>
            <select
              value={fromLocation}
              onChange={handleFromChange}
              id="buildings"
              name="buildings"
            >
              <option
                value={`${location.coordinates.lat},${location.coordinates.lng}`}
              >
                موقعك الحالي
              </option>
              {buildingLocation.map((building) => {
                return (
                  <option key={building.label} value={building.value}>
                    {building.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="buildings">إلى:</label>
            <select
              value={toLocation}
              onChange={handleToChange}
              id="buildings"
              name="buildings"
            >
              <option
                value={`${location.coordinates.lat},${location.coordinates.lng}`}
              >
                موقعك الحالي
              </option>
              {buildingLocation.map((building) => {
                return (
                  <option key={building.label} value={building.value}>
                    {building.label}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="bg-[#354d7a] text-white rounded-xl px-5 py-1 flex hover:bg-white hover:text-[#354d7a] font-medium border-solid border-2 border-[#354d7a] transition duration-150 ease-in m-4">اظهار الطريق</button>
        </div>
        <MapContainer
          center={userPosition}
          zoom={16}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <SetViewOnMarker />
          {fromLocationCoordinates.length && toLocationCoordinates.length && (
            <>
              <Marker position={fromLocationCoordinates} icon={markerIcon} />
              <Marker position={toLocationCoordinates} icon={markerIcon} />

              {/* Add routing control */}
              <RoutingControl
                fromLocationCoordinates={fromLocationCoordinates}
                toLocationCoordinates={toLocationCoordinates}
                ref={routingControl}
              />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

const RoutingControl = forwardRef(function RoutingControl(
  { fromLocationCoordinates, toLocationCoordinates },
  ref
) {
  const map = useMap();
  const routingControl = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        removeRoutingControl() {
          console.log("map", map, routingControl);
          if (routingControl.current && map) {
            map.removeControl(routingControl.current);
          }
        },
      };
    },
    [map]
  );

  useEffect(() => {
    if (
      map &&
      fromLocationCoordinates[0] &&
      fromLocationCoordinates[1] &&
      toLocationCoordinates[0] &&
      toLocationCoordinates[1]
    ) {
      routingControl.current = L.Routing.control({
        waypoints: [
          L.latLng(fromLocationCoordinates[0], fromLocationCoordinates[1]), // User's position
          L.latLng(toLocationCoordinates[0], toLocationCoordinates[1]),
        ],
        routeWhileDragging: false, // Disable routing while dragging
        addWaypoints: false, // Prevent adding waypoints, including direction text
        show: false, // Hide the routing
        createMarker: function () {
          return null;
        },
      }).addTo(map);
    }
  }, [map, toLocationCoordinates, fromLocationCoordinates]);

  return null;
});
export default Map;

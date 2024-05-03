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
    <div className="flex justify-between items-start text-center">
      <SideBar />
      <div className="w-1/2">
        <div>
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
          <button>اظهار الطريق</button>
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
// function RoutingControl({ fromLocationCoordinates, toLocationCoordinates }) {
//   const map = useMap();
//   // Create routing control
//   useEffect(() => {
//     let routingControl = null;

//     if (
//       map &&
//       fromLocationCoordinates[0] &&
//       fromLocationCoordinates[1] &&
//       toLocationCoordinates[0] &&
//       toLocationCoordinates[1]
//     ) {
//       routingControl = L.Routing.control({
//         waypoints: [
//           L.latLng(fromLocationCoordinates[0], fromLocationCoordinates[1]), // User's position
//           L.latLng(toLocationCoordinates[0], toLocationCoordinates[1]),
//         ],
//         routeWhileDragging: false, // Disable routing while dragging
//         addWaypoints: false, // Prevent adding waypoints, including direction text
//         show: false, // Hide the routing
//         createMarker: function () {
//           return null;
//         },
//       }).addTo(map);
//     }
//     return () => {
//       if (routingControl && map) {
//         map.removeControl(routingControl);
//       }
//     };
//   }, [map, toLocationCoordinates, fromLocationCoordinates]);

//   return null;
// }

export default Map;

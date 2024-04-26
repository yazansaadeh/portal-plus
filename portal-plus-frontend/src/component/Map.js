import { useDispatch, useSelector } from "react-redux";
import { getUserCourse } from "../store";
import { useEffect } from "react";
import SideBar from "./SideBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => {
    return state.course;
  });
  useEffect(() => {
    dispatch(getUserCourse());
  }, [dispatch]);

  return (
    <div className="flex justify-between items-start text-center">
      <SideBar />
      <div className="w-1/2">
        <MapContainer
          center={[32.1028, 36.1868]}
          zoom={16}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
}
export default Map;

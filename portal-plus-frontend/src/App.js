import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Dashboard from "./component/Dashboard";
import PrivateRoutes from "./component/PrivateRoutes";
import { isAuthenticated } from "./store";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated());
  }, []);
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="" exact element={<PrivateRoutes />}>
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
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

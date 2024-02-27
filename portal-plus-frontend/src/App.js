import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/loginPage/LoginForm";
import CreateCourse from "./component/createCoursePage/CreateCourse";

const Dashboard = () => {
  return <div>Dashboard</div>;
};
function App() {
  return (
    <div className="container">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createCourse" element={<CreateCourse />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

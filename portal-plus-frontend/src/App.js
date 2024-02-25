import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/LoginForm";

const Test = () => {
  return <div>Test</div>;
};
function App() {
  return (
    <div className="container">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Test />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

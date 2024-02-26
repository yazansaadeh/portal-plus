import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import { useForm, FormProvider } from "react-hook-form";

const Test = () => {
  return <div>Test</div>;
};
function App() {
  const methods = useForm();
  return (
    <div className="container">
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={
                <FormProvider {...methods}>
                  <LoginForm />
                </FormProvider>
              }
            />
            <Route path="/dashboard" element={<Test />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

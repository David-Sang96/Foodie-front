import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider />
      <Navbar />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;

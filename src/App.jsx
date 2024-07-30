import { Outlet } from "react-router-dom";
import Navbar2 from "./components/NavBar2";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider />
      <Navbar2 />
      <div className="p-2 md:p-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;

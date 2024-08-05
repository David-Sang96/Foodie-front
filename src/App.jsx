import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Navbar2 from "./components/NavBar2";
import ToastProvider from "./components/ToastProvider";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastProvider />
      <Navbar2 />

      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <div className="p-2 md:px-5 md:py-1">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;

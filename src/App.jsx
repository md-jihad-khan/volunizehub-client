import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="h-28 relative z-20 w-full">
        <Navbar></Navbar>
      </div>
      <Outlet />
    </>
  );
}

export default App;

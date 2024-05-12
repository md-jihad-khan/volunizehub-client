import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollRestoration />
      <div className="h-28 relative z-20 w-full">
        <Navbar></Navbar>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

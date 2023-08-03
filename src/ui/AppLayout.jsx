import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { useNavigation } from "react-router-dom";
import Loading from "./Loading";

function AppLayout() {
  const appState = useNavigation();

  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr] font-poppins">
      {appState.state === "loading" && <Loading />}

      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;

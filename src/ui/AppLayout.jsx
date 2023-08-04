import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigation } from "react-router-dom";
import Loading from "./Loading";
import CollectionConfirmation from "../components/CollectionConfirmation";
import { useSelector } from "react-redux";

function AppLayout() {
  const appState = useNavigation();
  const collectionIsOpen = useSelector(state=>state.collection.collectionIsOpen)
  const selectedContent = useSelector(state=>state.collection.selectedContent)



  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr] font-poppins">
      {appState.state === "loading" && <Loading />}
      {collectionIsOpen && <CollectionConfirmation content={selectedContent} />}
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;

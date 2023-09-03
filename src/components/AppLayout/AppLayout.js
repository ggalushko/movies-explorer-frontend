// IMPORT PACKAGES
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function AppLayout({ onHamburgerClick }) {
  const location = useLocation();

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default AppLayout;

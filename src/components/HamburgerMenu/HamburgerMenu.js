import "./HamburgerMenu.css";
import Overlay from "../Overlay/Overlay";
import AccountLink from "../AccountLink/AccountLink";
import Navigation from "../Navigation/Navigation";

function HamburgerMenu({ isSideMenuOpen, onClose }) {
  return (
    <Overlay isActive={isSideMenuOpen} onClose={onClose}>
      <div
        className={`hamburger-menu ${
          isSideMenuOpen ? "hamburger-menu_active" : ""
        }`}
      >
        <button
          className="hamburger-menu__btn-close hover-button"
          type="button"
          onClick={onClose}
        ></button>
        <Navigation isSideMenu={true} onClose={onClose} />
        <AccountLink isSideMenu={true} onClose={onClose} />
      </div>
    </Overlay>
  );
}

export default HamburgerMenu;

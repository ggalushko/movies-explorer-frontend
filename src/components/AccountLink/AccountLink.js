import { Link } from "react-router-dom";
import "./AccountLink.css";

function AccountLink({ isSideMenu, onClose }) {
  return (
    <Link
      to="/profile"
      onClick={onClose}
      className={`account-link ${
        isSideMenu ? "account-link_place_side-menu" : "account-link_hidden"
      } hover-button`}
    >
    </Link>
  );
}

export default AccountLink;

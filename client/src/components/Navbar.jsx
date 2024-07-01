import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavbarMenu } from "./Menus";

function Navbar() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?s=${e.target.value}`);
      console.log(`reloading: ${location.href}`);
      location.reload();
    }
  };

  return (
    <>
      <nav id="main-nav">
        <a href="/" className="site-title">
          <img src="/flickette_icon.svg" alt="icon" />
          <span>Flickette</span>
        </a>
        <ul>
          <li>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search"
              onKeyDown={handleKeyDown}
            />
          </li>
          <li>
            <NavbarMenu onLogout={logout} />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

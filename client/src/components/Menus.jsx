import { useState, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AppThemeContext } from "../context/AppThemeProvider";

export const NavbarMenu = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { appTheme, toggleAppTheme } = useContext(AppThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="basic-menu"
        slotProps={{
          paper: {
            style: {
              marginTop: "0.2rem",
            },
          },
        }}
      >
        <MenuItem onClick={() => toggleAppTheme()}>
          Switch to {appTheme === "dark-theme" ? "light" : "dark"} theme
        </MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

NavbarMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

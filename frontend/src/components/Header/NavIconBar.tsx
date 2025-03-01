import { AccountCircle, Mail, Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { authReset } from "@redux/slices/portal/auth";
import { login_signup_route, message_route, profile_route } from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const NavIconBar = () => {
  const localStorageHandler = new LocalStorageHandler();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorageHandler.removeAll();
    dispatch(authReset());
    navigate(login_signup_route);
  }

  const navigateToProfile = () => {
    const profileId = localStorageHandler.profileId;
    navigate(profile_route(profileId))
  }

  const iconButtons: NavIconType[] = [
    {
      key: 1,
      Icon: Mail,
      isActive: location.pathname === message_route,
      onClick: () => {
        navigate(message_route);
      },
      fontSize: "small",
    },
    { key: 2, Icon: Notifications, isActive: false, onClick: () => {} },
    {
      key: 3,
      Icon: AccountCircle,
      isActive: false,
      onClick: () => {},
      menu: [
        { label: "My Profile", onClick: navigateToProfile },
        { label: "Logout", onClick: logout },
      ],
    },
  ];
  return (
    <Box>
      {iconButtons.map((props) => (
        <NavIcon {...props} />
      ))}
    </Box>
  );
};

type NavIconType = {
  key: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  isActive: boolean;
  onClick: () => void;
  badgeCount?: number;
  fontSize?: "small" | "medium" | "large";
  menu?: NavMenuType[];
};

type NavMenuType = {
  label: string;
  onClick: () => void;
};

const NavIcon = ({
  key,
  Icon,
  isActive,
  onClick,
  badgeCount,
  fontSize,
  menu,
}: NavIconType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        onClick={menu ? handleOpenMenu : onClick}
        id={`${key}-nav-icon-button`}
        aria-controls={open ? `${key}-nav-icon-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge badgeContent={badgeCount}>
          <Icon
            fontSize={fontSize || "medium"}
            color={isActive ? "secondary" : "info"}
          />
        </Badge>
      </IconButton>
      {menu && (
        <Menu
          id={`${key}-nav-icon-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": `${key}-nav-icon-button`,
          }}
        >
          {menu.map((menuItem) => (
            <MenuItem
              onClick={() => {
                menuItem.onClick();
                handleClose();
              }}
            >
              {menuItem.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default NavIconBar;

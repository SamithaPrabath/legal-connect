import { AccountCircle, Mail, Notifications } from "@mui/icons-material";
import { Badge, Box, IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { message_route } from "@utils/context-paths";
import { useLocation, useNavigate } from "react-router-dom";

const NavIconBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const iconButtons: NavIconType[] = [
    {Icon: Mail, isActive: location.pathname === message_route, onClick: () => {navigate(message_route)}, fontSize:"small"},
    {Icon: Notifications, isActive: false, onClick: () => {}},
    {Icon: AccountCircle, isActive: false, onClick: () => {}}
  ]
  return (
    <Box>
      {iconButtons.map(props => <NavIcon {...props} />)}
    </Box>
  )
}

type NavIconType = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  isActive: boolean,
  onClick: () => void,
  badgeCount?: number,
  fontSize?: "small" | "medium" | "large"
}

const NavIcon = ({Icon, isActive, onClick, badgeCount, fontSize}: NavIconType) => {

  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={badgeCount}>
      <Icon fontSize={fontSize || "medium"} color={isActive ? "secondary": "info"} />
      </Badge>
    </IconButton>
  )
}

export default NavIconBar

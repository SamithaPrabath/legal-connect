import { Box, Typography } from "@mui/material"
import { findalawyer_route, mycases_route, payment_request_route, schedule_route } from "@utils/context-paths"
import { Link, useLocation } from "react-router-dom"

const NavigationBar = () => {
  const elements: NavElementType[] = [
    { name: "My Cases", contextPath: mycases_route},
    { name: "Schedule", contextPath: schedule_route},
    { name: "Find a Lawyer", contextPath: findalawyer_route},
    { name: "Payments", contextPath: payment_request_route}
  ]
  return (
    <Box display="flex" gap="20px">
      {elements.map(props => <NavElement {...props} />)}
    </Box>
  )
}

type NavElementType = {
  name: string;
  contextPath: string;
  hidden?: boolean
}

const NavElement = ({contextPath, name, hidden = false}: NavElementType) => {
  const location = useLocation();

  if (hidden) return null;

  return (
    <Typography variant="h4" color={location.pathname.startsWith(contextPath) ? "secondary" : "textSecondary"}>
      <Link style={{textDecoration:"none", color:"inherit"}} to={contextPath}>{name}</Link>
    </Typography>
  )
}

export default NavigationBar

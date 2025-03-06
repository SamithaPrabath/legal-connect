import { Box, Typography } from "@mui/material"
import { UserType } from "@type/User"
import { findalawyer_route, mycases_route, payments_route, schedule_route } from "@utils/context-paths"
import LocalStorageHandler from "@utils/localStorageHandler"
import { Link, useLocation } from "react-router-dom"

const NavigationBar = () => {

  const userType = new LocalStorageHandler().userType


  if (userType === UserType.ADMIN) return null;

  const elements: NavElementType[] = [
    { name: "My Cases", contextPath: mycases_route,},
    { name: "Schedule", contextPath: schedule_route},
    { name: "Find a Lawyer", contextPath: findalawyer_route, hidden: userType !== UserType.CLIENT},
    { name: "Payments", contextPath: payments_route}
  ]
  return (
    <Box display="flex" gap="20px">
      {elements.map((props, key) => <NavElement key={key} {...props} />)}
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

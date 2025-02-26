import SectionNavBar, { Section } from "@components/SectionNavBar"
import SubHeader from "@components/SubHeader"
import { Box } from "@mui/material"
import { payment_history_route, payment_request_route, payments_route } from "@utils/context-paths"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const Payments = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const sections: Section[] = [
    {label: "Requests", contextPath:payment_request_route},
    {label: "History", contextPath: payment_history_route}
  ]

  useEffect(() => {
    if (location.pathname === payments_route) navigate(payment_request_route)
  },[location])


  return (
    <Box>
      <SubHeader display="flex" alignItems="end" >
        <SectionNavBar sections={sections} />
      </SubHeader>
      <Outlet />
    </Box>
  )
}

export default Payments

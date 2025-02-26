import SectionNavBar, { Section } from "@components/SectionNavBar"
import SubHeader from "@components/SubHeader"
import { Box } from "@mui/material"
import { payment_history_route, payment_request_route } from "@utils/context-paths"
import { Outlet } from "react-router-dom"

const Payments = () => {

  const sections: Section[] = [
    {label: "Requests", contextPath:payment_request_route},
    {label: "History", contextPath: payment_history_route}
  ]


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

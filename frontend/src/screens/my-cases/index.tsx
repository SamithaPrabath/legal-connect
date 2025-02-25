import { mycases_route } from "@utils/context-paths";
import { Outlet, useLocation } from "react-router-dom"
import MyCasesLawyer from "./LawyerCases";
import { Box } from "@mui/material";

const MyCases = () => {
  const location = useLocation();
  return (
    <Box height="100%">
      {location.pathname === mycases_route && <MyCasesLawyer />}
      <Outlet />
    </Box>
  )
}

export default MyCases

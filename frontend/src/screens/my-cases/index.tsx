import { mycases_route } from "@utils/context-paths";
import { Outlet, useLocation } from "react-router-dom"
import MyCasesLawyer from "./LawyerCases";

const MyCases = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === mycases_route && <MyCasesLawyer />}
      <Outlet />
    </div>
  )
}

export default MyCases

import { mycases_route } from "@utils/context-paths";
import { Outlet, useLocation } from "react-router-dom"
import MyCasesCompo from "./MyCases";

const MyCases = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === mycases_route && <MyCasesCompo />}
      <Outlet />
    </div>
  )
}

export default MyCases

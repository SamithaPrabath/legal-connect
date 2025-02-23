import Background from "@components/Background";
import { RouterProvider } from "react-router-dom";
import router from "./route-config";

const App = () => {
  return <Background>
    {/* <Test /> */}
    <RouterProvider router={router} />
    {/* <LoginSignUp /> */}
  </Background>
}

export default App;
